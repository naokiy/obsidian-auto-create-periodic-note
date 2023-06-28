export type Notifier = {
  show(text: string, onclicked?: OnClickedFunction): void;
};

type OnClickedFunctionPlain = {
  (): void;
};

type OnClickedFunctionPromise = {
  (): Promise<void>;
};

export type OnClickedFunction =
  | OnClickedFunctionPlain
  | OnClickedFunctionPromise;

export type NotifierProvider = {
  get(): Notifier;
};
