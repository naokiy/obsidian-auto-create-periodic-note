/* eslint-disable perfectionist/sort-objects */
export const NotifierType = {
  Desktop: "desktop",
  Obsidian: "obsidian",
  None: "none",
} as const;
/* eslint-enable perfectionist/sort-objects */

export type NotifierType = (typeof NotifierType)[keyof typeof NotifierType];

export const notifierTypes = Object.values(NotifierType);

export function isNotifierType(value: unknown): value is NotifierType {
  return typeof value === "string" && notifierTypes.some((e) => e === value);
}
