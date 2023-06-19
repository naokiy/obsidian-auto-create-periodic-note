import { PluginSettingTab } from "./PluginSettingTab";
import { Scheduler } from "./Scheduler";
import type { Settings } from "./Settings";
import { toSettings } from "./Settings";

import * as obsidian from "obsidian";

export class Plugin extends obsidian.Plugin {
  settings: Settings;
  scheduler: Scheduler;

  constructor(app: obsidian.App, manifest: obsidian.PluginManifest) {
    super(app, manifest);
    this.scheduler = new Scheduler();
  }

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new PluginSettingTab(this.app, this));
  }

  onunload() {
    this.deactivateScheduler();
  }

  async loadSettings() {
    this.settings = toSettings(await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  activateScheduler(): void {
    this.scheduler.start();
  }

  deactivateScheduler(): void {
    this.scheduler.stop();
  }
}
