import { Scheduler } from "./Scheduler";
import type { SettingRepository } from "./SettingRepository";

export class Controller {
  private _active: boolean;
  private scheduler: Scheduler;

  constructor(private readonly repository: SettingRepository<boolean>) {
    this._active = this.repository.load(false);
    this.scheduler = new Scheduler();
    if (this._active) {
      this.scheduler.start();
    }
  }

  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    if (this._active === active) {
      return;
    }
    if (active) {
      this.scheduler.start();
    } else {
      this.scheduler.stop();
    }
    this._active = active;
    this.repository.save(active);
  }

  onUnload(): void {
    this.scheduler.stop();
  }
}
