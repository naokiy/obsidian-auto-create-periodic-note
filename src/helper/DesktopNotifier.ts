import type { Notifier } from "../controller/Notifier";

import { Platform } from "obsidian";

export class DesktopNotifier implements Notifier {
  constructor(private readonly pluginName: string) {}

  show(message: string): void {
    if (!Platform.isDesktopApp) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const electron = require("electron");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const Notification = electron.remote.Notification;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const n = new Notification({
      title: this.pluginName,
      silent: true,
      body: message,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    n.show();
  }
}
