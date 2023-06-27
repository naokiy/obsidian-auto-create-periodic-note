export type Notifier = {
  show(text: string, onclicked?: OnClickedFunction): void;
};

export type OnClickedFunction = {
  (): void;
};
