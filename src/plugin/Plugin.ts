import { Controller } from "../controller/Controller";
import { LocalStorageBooleanGateway } from "../helper/local_storage/LocalStorageBooleanGateway";
import { LocalStorageNotifierTypeGateway } from "../helper/local_storage/LocalStorageNotifierTypeGateway";
import { NotifierFactory } from "../helper/notifier/NotifierFactory";

import { PluginSettingTab } from "./PluginSettingTab";

import * as obsidian from "obsidian";

import type { SettingRepository } from "src/controller/SettingRepository";
import { DailyNoteCreatorImpl } from "src/helper/DailyNoteCreatorImpl";
import { checkDailyNoteSupported } from "src/helper/checkDailyNoteSupported";
import { NotifierType } from "src/helper/notifier/NotifierType";

export class Plugin extends obsidian.Plugin {
  public _controller: Controller;

  public _activeSetting: SettingRepository<boolean>;

  public _notifierTypeSetting: SettingRepository<NotifierType>;
  public _silentNotificationSetting: SettingRepository<boolean>;

  onload() {
    this.addSettingTab(new PluginSettingTab(this));

    this._activeSetting = new LocalStorageBooleanGateway(this, "active", false);
    this._notifierTypeSetting = new LocalStorageNotifierTypeGateway(
      this,
      "notifier-type",
      NotifierType.Obsidian
    );
    this._silentNotificationSetting = new LocalStorageBooleanGateway(
      this,
      "notifier-silent",
      false
    );

    this._controller = new Controller(
      this._activeSetting,
      new NotifierFactory(
        this.manifest.id,
        this._notifierTypeSetting,
        this._silentNotificationSetting
      ),
      new DailyNoteCreatorImpl(),
      checkDailyNoteSupported
    );
  }

  onunload() {
    this._controller.onUnload();
  }

  get controller(): Controller {
    return this._controller;
  }

  get activeSetting(): SettingRepository<boolean> {
    return this._activeSetting;
  }

  get notifierTypeSetting(): SettingRepository<NotifierType> {
    return this._notifierTypeSetting;
  }

  get silentNotificationSetting(): SettingRepository<boolean> {
    return this._silentNotificationSetting;
  }

  get isDailyNoteSupported(): boolean {
    return checkDailyNoteSupported();
  }
}
