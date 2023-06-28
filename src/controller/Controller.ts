import type { CheckDailyNoteSupportedFunction } from "./CheckDailyNoteSupportedFunction";
import type { DailyNoteCreator } from "./DailyNoteCreator";
import type { NotifierProvider } from "./Notifier";
import { DailyScheduler } from "./Scheduler";
import type { SettingReader } from "./SettingRepository";

import { isNotNull } from "option-t/Nullable";
import { isOk, unwrapErr, unwrapOk } from "option-t/PlainResult";

export class Controller {
  private _active: boolean;
  private scheduler: DailyScheduler;

  constructor(
    private readonly activeSetting: SettingReader<boolean>,
    private readonly notifierProvider: NotifierProvider,
    private readonly dailyNoteCreator: DailyNoteCreator,
    private readonly checkDailyNoteSupported: CheckDailyNoteSupportedFunction
  ) {
    this.scheduler = new DailyScheduler();
    this._active = this.activeSetting.load();
    if (this._active) {
      this.startScheduler();
    }
  }

  setActive(active: boolean): void {
    if (this._active === active) {
      return;
    }
    if (active) {
      this.startScheduler();
    } else {
      this.stopScheduler();
    }
    this._active = active;
  }

  onUnload(): void {
    this.stopScheduler();
  }

  private startScheduler() {
    this.scheduler.start(async () => {
      if (!this.checkDailyNoteSupported()) {
        console.log(
          "Auto create periodic note:",
          "Daily note setting is not exists"
        );
      }
      const creationResult = await this.dailyNoteCreator.create();
      if (isOk(creationResult)) {
        const created = unwrapOk(creationResult);
        if (isNotNull(created)) {
          this.notifierProvider
            .get()
            .show("New daily note created", async () => {
              await app.workspace.getLeaf().openFile(created, { active: true });
            });
        } else {
          console.log(
            "Auto create periodic note:",
            "Creation of a new daily note was skipped because it already exists."
          );
        }
      } else {
        throw unwrapErr(creationResult);
      }
    });
  }

  private stopScheduler() {
    this.scheduler.stop();
  }
}
