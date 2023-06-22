import type { MessageDisplay } from "../controller/MessageDisplay";

import { Notice } from "obsidian";

export class Notifier implements MessageDisplay {
  constructor(private readonly pluginName: string) {}

  show(text: string): void {
    new Notice((this.pluginName !== "" ? this.pluginName + ": " : "") + text);
  }
}
