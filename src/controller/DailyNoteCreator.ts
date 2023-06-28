import type { TFile } from "obsidian";
import type { Nullable } from "option-t/Nullable";
import type { Result } from "option-t/PlainResult";

export type DailyNoteCreator = {
  create(): Promise<Result<Nullable<TFile>, Error>>;
};
