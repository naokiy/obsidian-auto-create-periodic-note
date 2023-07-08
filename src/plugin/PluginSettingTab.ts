import type { Plugin } from "./Plugin";

import * as obsidian from "obsidian";
import { NotifierType, isNotifierType } from "src/helper/notifier/NotifierType";

export class PluginSettingTab extends obsidian.PluginSettingTab {
  plugin: Plugin;

  constructor(plugin: Plugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }

  private displayActiveSettings(containerEl: HTMLElement) {
    new obsidian.Setting(containerEl)
      .setName("Run on this device")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.createDailySetting.load())
          .onChange((value) => {
            this.plugin.createDailySetting.save(value);
            this.plugin.controller.setActive(value);
            this.display();
          })
      );
  }

  private displayNotificationSettings(containerEl: HTMLElement) {
    const currentNotifierType = this.plugin.notifierTypeSetting.load();

    containerEl.createEl("h3", {
      text: "Notification settings",
    });

    new obsidian.Setting(containerEl)
      .setName("Notification type")
      .addDropdown((dropdown) => {
        const options = {
          desktop: "Notify on desktop",
          none: "No notification",
          obsidian: "Notify in obsidian",
        } as const satisfies Record<NotifierType, string>;
        dropdown.addOptions(options);
        dropdown.setValue(currentNotifierType);

        dropdown.onChange((option: string) => {
          if (isNotifierType(option)) {
            this.plugin.notifierTypeSetting.save(option);
            this.display();
          }
        });
      });

    if (currentNotifierType === NotifierType.Desktop) {
      new obsidian.Setting(containerEl).setName("Silent?").addToggle((toggle) =>
        toggle
          .setValue(this.plugin.silentNotificationSetting.load())
          .onChange((value) => {
            this.plugin.silentNotificationSetting.save(value);
          })
      );
    }
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h2", {
      text: "Settings for Auto Create Periodic Note.",
    });

    if (this.plugin.isDailyNoteSupported) {
      this.displayActiveSettings(containerEl);

      if (this.plugin.createDailySetting.load()) {
        this.displayNotificationSettings(containerEl);
      }
    }
  }
}
