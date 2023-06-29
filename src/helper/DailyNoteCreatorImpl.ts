import type { DailyNoteCreator } from "../controller/DailyNoteCreator";

import moment from "moment";
import type { TFile } from "obsidian";
import {
  createDailyNote,
  getAllDailyNotes,
  getDailyNote,
} from "obsidian-daily-notes-interface";

import { isNotNullOrUndefined } from "option-t/Maybe";
import type { Maybe } from "option-t/Maybe";
import type { Nullable } from "option-t/Nullable";
import { createOk } from "option-t/PlainResult";
import type { Result } from "option-t/PlainResult";
import { tryCatchIntoResultWithEnsureErrorAsync } from "option-t/PlainResult/tryCatchAsync";

function checkAlreadyExists(date: moment.Moment): boolean {
  const dailyNote: Maybe<TFile> = getDailyNote(date, getAllDailyNotes());
  return isNotNullOrUndefined(dailyNote);
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
