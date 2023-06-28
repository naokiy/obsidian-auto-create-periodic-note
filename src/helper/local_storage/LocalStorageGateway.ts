import type { App, Plugin } from "obsidian";

interface UnsafeAppInterface {
  loadLocalStorage(key: string): string | null;
  saveLocalStorage(key: string, value: string | undefined): void;
}

type UnsafeApp = App & UnsafeAppInterface;

export class LocalStorageGateway {
  private readonly unsafeApp: UnsafeApp;
  private readonly prefix: string;

  constructor(plugin: Plugin) {
    this.unsafeApp = plugin.app as UnsafeApp;
    this.prefix = plugin.manifest.id + ":";
  }

  load(key: string): string | null {
    return this.unsafeApp.loadLocalStorage(this.prefix + key);
  }

  save(key: string, value: string) {
    this.unsafeApp.saveLocalStorage(this.prefix + key, value);
  }
}
