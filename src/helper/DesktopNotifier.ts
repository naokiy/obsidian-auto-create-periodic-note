import type { Notifier } from "../controller/Notifier";

import notifier from "node-notifier";

export class DesktopNotifier implements Notifier {
  constructor(private readonly pluginName: string) {}

  show(message: string): void {
    notifier.notify({
      title: this.pluginName,
      message: message,
    });
  }
}
