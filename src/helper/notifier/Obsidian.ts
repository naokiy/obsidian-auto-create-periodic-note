import type { Notifier } from "../../controller/Notifier";

import { Notice } from "obsidian";

export class ObsidianNotifier implements Notifier {
  constructor(private readonly pluginName: string) {}

  show(text: string): void {
    new Notice((this.pluginName !== "" ? this.pluginName + ": " : "") + text);
  }
}
