import type { DailyNoteCreator } from "../controller/DailyNoteCreator";

import moment from "moment";
import type { TFile } from "obsidian";
import {
  createDailyNote,
  getDailyNote,
  getAllDailyNotes,
} from "obsidian-daily-notes-interface";
import type { Nullable } from "option-t/Nullable";
import type { Result } from "option-t/PlainResult";
import { createOk } from "option-t/PlainResult";
import { tryCatchIntoResultWithEnsureErrorAsync } from "option-t/PlainResult/tryCatchAsync";

function checkAlreadyExists(date: moment.Moment): boolean {
  return getDailyNote(date, getAllDailyNotes()) !== null;
}

export class DailyNoteCreatorImpl implements DailyNoteCreator {
  async create(): Promise<Result<Nullable<TFile>, Error>> {
    const date = moment();

    if (checkAlreadyExists(date)) {
      return createOk(null);
    }

    return await tryCatchIntoResultWithEnsureErrorAsync(
      async () => await createDailyNote(date)
    );
  }
}
