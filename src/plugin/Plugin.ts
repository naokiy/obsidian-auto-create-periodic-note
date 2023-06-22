import { Controller } from "../controller/Controller";
import { LocalStorageBooleanGateway } from "../helper/LocalStorageBooleanGateway";
import { ObsidianNotifier } from "../helper/ObsidianNotifier";

import { PluginSettingTab } from "./PluginSettingTab";

import * as obsidian from "obsidian";

export class Plugin extends obsidian.Plugin {
  public _controller: Controller;

  onload() {
    this.addSettingTab(new PluginSettingTab(this.app, this));
    this._controller = new Controller(
      new LocalStorageBooleanGateway(app, "active"),
      new ObsidianNotifier("Auto create periodic note")
    );
  }

  onunload() {
    this._controller.onUnload();
  }

  get controller(): Controller {
    return this._controller;
  }
}
