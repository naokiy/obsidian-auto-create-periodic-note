import type { SettingRepository } from "../../controller/SettingRepository";

import { LocalStorageGateway } from "./LocalStorageGateway";

import type { Plugin } from "obsidian";

export class LocalStorageBooleanGateway implements SettingRepository<boolean> {
  private readonly gateway: LocalStorageGateway;

  constructor(
    private readonly plugin: Plugin,
    private readonly key: string,
    private readonly defaultValue: boolean
  ) {
    this.gateway = new LocalStorageGateway(plugin);
  }

  load(): boolean {
    const loaded = this.gateway.load(this.key);
    if (loaded === null) {
      return this.defaultValue;
    }
    return !!loaded && loaded !== "false";
  }

  save(value: boolean): void {
    this.gateway.save(this.key, value ? "true" : "false");
  }
}
