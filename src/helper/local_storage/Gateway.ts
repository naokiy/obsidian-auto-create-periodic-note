import type { App, Plugin } from "obsidian";

type UnsafeAppInterface = {
  loadLocalStorage(key: string): null | string;
  saveLocalStorage(key: string, value: string | undefined): void;
};

type UnsafeApp = App & UnsafeAppInterface;

export class Gateway {
  private readonly prefix: string;
  private readonly unsafeApp: UnsafeApp;

  constructor(plugin: Plugin) {
    this.unsafeApp = plugin.app as UnsafeApp;
    this.prefix = plugin.manifest.id + ":";
  }

  load(key: string): null | string {
    return this.unsafeApp.loadLocalStorage(this.prefix + key);
  }

  save(key: string, value: string) {
    this.unsafeApp.saveLocalStorage(this.prefix + key, value);
  }
}
