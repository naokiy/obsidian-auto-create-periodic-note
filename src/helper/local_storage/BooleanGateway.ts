import type { SettingRepository } from "../../controller/SettingRepository";

import { Gateway } from "./Gateway";

import type { Plugin } from "obsidian";

export class BooleanGateway implements SettingRepository<boolean> {
  private readonly gateway: Gateway;

  constructor(
    plugin: Plugin,
    private readonly key: string,
    private readonly defaultValue: boolean
  ) {
    this.gateway = new Gateway(plugin);
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
