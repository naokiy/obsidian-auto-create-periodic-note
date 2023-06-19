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

    containerEl.createEl("h2", { text: "Settings for my awesome plugin." });

    new obsidian.Setting(containerEl)
      .setName("Setting #1")
      .setDesc("It's a secret")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.active).onChange(async (value) => {
          this.plugin.settings.active = value;
          await this.plugin.saveSettings();
        })
      );
  }
}
