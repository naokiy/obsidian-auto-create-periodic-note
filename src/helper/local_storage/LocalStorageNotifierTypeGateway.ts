import type { SettingRepository } from "../../controller/SettingRepository";
import type { NotifierType } from "../notifier/NotifierType";
import { isNotifierType } from "../notifier/NotifierType";

import { LocalStorageGateway } from "./LocalStorageGateway";

import type { Plugin } from "obsidian";

export class LocalStorageNotifierTypeGateway
  implements SettingRepository<NotifierType>
{
  private readonly gateway: LocalStorageGateway;

  constructor(
    plugin: Plugin,
    private readonly key: string,
    private readonly defaultValue: NotifierType
  ) {
    this.gateway = new LocalStorageGateway(plugin);
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
