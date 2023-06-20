export type SettingReader<T> = {
  load(defaultValue: T): T;
};

export type SettingWriter<T> = {
  save(value: T): void;
};

export type SettingRepository<T> = SettingReader<T> & SettingWriter<T>;
