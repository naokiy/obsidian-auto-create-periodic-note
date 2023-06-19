// Remember to rename these classes and interfaces!
export interface Settings {
  active: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  active: false,
};

export function toSettings(value: unknown): Settings {
  if (typeof value !== "object" || value === null) {
    return DEFAULT_SETTINGS;
  }
  return {
    active:
      "active" in value && typeof value.active === "boolean"
        ? value.active
        : DEFAULT_SETTINGS.active,
  };
}
