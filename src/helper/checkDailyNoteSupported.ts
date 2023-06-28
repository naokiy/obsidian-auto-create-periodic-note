import type { CheckDailyNoteSupportedFunction } from "../controller/CheckDailyNoteSupportedFunction";

import { appHasDailyNotesPluginLoaded } from "obsidian-daily-notes-interface";

export const checkDailyNoteSupported: CheckDailyNoteSupportedFunction = () =>
  appHasDailyNotesPluginLoaded();
