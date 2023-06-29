import * as schedule from "node-schedule";

export type ScheduledFunction = () => Promise<void>;

export class DailyScheduler {
  private job?: schedule.Job;
  private running: boolean;

  constructor() {
    this.running = false;
  }

  start(fn: ScheduledFunction): void {
    if (this.running) {
      return;
    }
    this.running = true;
    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.minute = 0;
    this.job = schedule.scheduleJob(rule, async () => fn());
  }

  stop(): void {
    if (!this.running) {
      return;
    }
    this.running = false;
    this.job?.cancel(false);
  }
}
