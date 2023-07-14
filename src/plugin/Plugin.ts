import { Controller } from "../controller/Controller";
import type { SettingRepository } from "../controller/SettingRepository";
import { DailyNoteCreatorImpl } from "../helper/DailyNoteCreatorImpl";
import { checkDailyNoteSupported } from "../helper/checkDailyNoteSupported";
import { BooleanGateway, NotifierTypeGateway } from "../helper/local_storage/";
import { NotifierFactory, NotifierType } from "../helper/notifier/";

import { PluginSettingTab } from "./PluginSettingTab";

import * as obsidian from "obsidian";

export class Plugin extends obsidian.Plugin {
  public _createDailySetting!: SettingRepository<boolean>;

  public _controller!: Controller;

  public _notifierTypeSetting!: SettingRepository<NotifierType>;
  public _silentNotificationSetting!: SettingRepository<boolean>;

  onload() {
    this.addSettingTab(new PluginSettingTab(this));

    this._createDailySetting = new BooleanGateway(this, "create-daily", false);
    this._notifierTypeSetting = new NotifierTypeGateway(
      this,
      "notifier-type",
      NotifierType.Obsidian,
    );
    this._silentNotificationSetting = new BooleanGateway(
      this,
      "notifier-silent",
      false,
    );

    this._controller = new Controller(
      this._createDailySetting,
      new NotifierFactory(
        this.manifest.id,
        this._notifierTypeSetting,
        this._silentNotificationSetting,
      ),
      new DailyNoteCreatorImpl(),
      checkDailyNoteSupported,
    );
  }

  onunload() {
    this._controller.onUnload();
  }

  get controller(): Controller {
    return this._controller;
  }

  get isDailyNoteSupported(): boolean {
    return checkDailyNoteSupported();
  }

  get createDailySetting(): SettingRepository<boolean> {
    return this._createDailySetting;
  }

  get notifierTypeSetting(): SettingRepository<NotifierType> {
    return this._notifierTypeSetting;
  }

  get silentNotificationSetting(): SettingRepository<boolean> {
    return this._silentNotificationSetting;
  }
}
