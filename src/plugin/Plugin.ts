import type { Settings } from "../Settings";
import { DEFAULT_SETTINGS } from "../Settings";

import { PluginSettingTab } from "./PluginSettingTab";

import moment from "moment";
import * as schedule from "node-schedule";
import * as obsidian from "obsidian";
import { createDailyNote } from "obsidian-daily-notes-interface";

export class Plugin extends obsidian.Plugin {
  settings: Settings;
  job?: schedule.Job;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new PluginSettingTab(this.app, this));
  }

  onunload() {
    this.job?.cancel();
  }

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

  activateSchedule(): void {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.minute = 0;
    schedule.scheduleJob(rule, async () => {
      const date = moment();
      await createDailyNote(date);
    });
  }
}
