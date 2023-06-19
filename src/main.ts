import { AutoCreatePeriodicNoteSettingTab } from "./AutoCreatePeriodicNoteSettingTab";

import { Plugin } from "obsidian";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default",
};

export default class AutoCreatePeriodicNotePlugin extends Plugin {
  settings: MyPluginSettings;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new AutoCreatePeriodicNoteSettingTab(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    ) as MyPluginSettings;
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
