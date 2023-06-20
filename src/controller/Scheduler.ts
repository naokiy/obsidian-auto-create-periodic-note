import moment from "moment";
import * as schedule from "node-schedule";
import { createDailyNote } from "obsidian-daily-notes-interface";

export class Scheduler {
  private job?: schedule.Job;
  private running: boolean;

  constructor() {
    this.running = false;
  }

  start(): void {
    if (this.running) {
      return;
    }
    this.running = true;
    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.minute = 0;
    this.job = schedule.scheduleJob(rule, async () => {
      const date = moment();
      await createDailyNote(date);
    });
  }

  stop(): void {
    if (!this.running) {
      return;
    }
    this.running = false;
    this.job?.cancel(false);
  }
}
