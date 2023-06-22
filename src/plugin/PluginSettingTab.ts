import type { Plugin } from "./Plugin";

import * as obsidian from "obsidian";

export class PluginSettingTab extends obsidian.PluginSettingTab {
  plugin: Plugin;

  constructor(app: obsidian.App, plugin: Plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h2", {
      text: "Settings for Auto Create Periodic Note.",
    });

    new obsidian.Setting(containerEl)
      .setName("Run on this device")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.controller.active).onChange((value) => {
          this.plugin.controller.active = value;
        })
      );
  }
}
