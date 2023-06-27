import { TFile } from "obsidian";

export type DailyNoteCreator = {
    create(): Promise<TFile>;
};