import type { Notifier, OnClickedFunction } from "../../controller/Notifier";

import { Platform } from "obsidian";

export class DesktopNotifier implements Notifier {
  constructor(
    private readonly pluginName: string,
    private readonly silent: boolean = false
  ) {}

  show(message: string, onClicked?: OnClickedFunction): void {
    if (!Platform.isDesktopApp) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const electron = require("electron");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const Notification = electron.remote.Notification;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const n = new Notification({
      body: message,
      silent: this.silent,
      title: this.pluginName,
    });

    if (onClicked !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      n.on("click", async () => {
        await onClicked();
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    n.show();
  }
}
