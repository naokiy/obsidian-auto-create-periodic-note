import type { Settings } from "../Settings";
import { DEFAULT_SETTINGS } from "../Settings";

import { PluginSettingTab } from "./PluginSettingTab";

import * as obsidian from "obsidian";

export class Plugin extends obsidian.Plugin {
  settings: Settings;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new PluginSettingTab(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    ) as Settings;
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
