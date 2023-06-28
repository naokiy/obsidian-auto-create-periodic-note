export type SettingReader<T> = {
  load(): T;
};

export type SettingWriter<T> = {
  save(value: T): void;
};

export type SettingRepository<T> = SettingReader<T> & SettingWriter<T>;
