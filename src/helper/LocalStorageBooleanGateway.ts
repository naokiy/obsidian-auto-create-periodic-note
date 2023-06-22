import type { SettingRepository } from "../controller/SettingRepository";

import type { App } from "obsidian";

interface UnsafeAppInterface {
  loadLocalStorage(key: string): string | null;
  saveLocalStorage(key: string, value: string | undefined): void;
}

type UnsafeApp = App & UnsafeAppInterface;

export class LocalStorageBooleanGateway implements SettingRepository<boolean> {
  private readonly unsafeApp: UnsafeApp;

  constructor(app: App, private readonly key: string) {
    this.unsafeApp = app as UnsafeApp;
  }

  load(defaultValue: boolean): boolean {
    const loaded = this.unsafeApp.loadLocalStorage(this.key);
    if (loaded === null) {
      return defaultValue;
    }
    return !!loaded;
  }

  save(value: boolean): void {
    this.unsafeApp.saveLocalStorage(this.key, value ? "true" : "false");
  }
}
