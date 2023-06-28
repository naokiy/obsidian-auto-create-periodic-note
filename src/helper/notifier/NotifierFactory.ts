import type { Notifier, NotifierProvider } from "../../controller/Notifier";
import type { SettingReader } from "../../controller/SettingRepository";

import { DesktopNotifier } from "./DesktopNotifier";
import { NotifierType } from "./NotifierType";
import { ObsidianNotifier } from "./ObsidianNotifier";

class NoOpNotifier implements Notifier {
  show(text: string) {}
}

export class NotifierFactory implements NotifierProvider {
  constructor(
    private readonly pluginName: string,
    private readonly typeGateway: SettingReader<NotifierType>,
    private readonly silentGateway: SettingReader<boolean>
  ) {}

  get(): Notifier {
    const type = this.typeGateway.load();

    switch (type) {
      case NotifierType.Desktop:
        return new DesktopNotifier(this.pluginName, this.silentGateway.load());
      case NotifierType.Obsidian:
        return new ObsidianNotifier(this.pluginName);
      case NotifierType.None:
      default:
        return new NoOpNotifier();
    }
  }
}
