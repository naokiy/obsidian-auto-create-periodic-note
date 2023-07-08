import type { SettingRepository } from "../../controller/SettingRepository";
import type { NotifierType } from "../notifier/";
import { isNotifierType } from "../notifier/";

import { Gateway } from "./Gateway";

import type { Plugin } from "obsidian";

export class NotifierTypeGateway implements SettingRepository<NotifierType> {
  private readonly gateway: Gateway;

  constructor(
    plugin: Plugin,
    private readonly key: string,
    private readonly defaultValue: NotifierType
  ) {
    this.gateway = new Gateway(plugin);
  }

  load(): NotifierType {
    const loaded = this.gateway.load(this.key);
    if (loaded === null || !isNotifierType(loaded)) {
      return this.defaultValue;
    }
    return loaded;
  }

  save(value: NotifierType): void {
    this.gateway.save(this.key, value);
  }
}
