export type IBase = {
  setClassName: (name: string) => void;
  getPath: () => string[];
  getParent: () => INode | null;
};

export type IAttribute = {
  getKey: () => string;
  getValue: () => string;
} & IBase;

export type INode = {
  getName: () => string;
  getAttributes: () => IAttribute[];
  getValues: () => string[];
  getChildren: () => INode[];
} & IBase;

export type IValue = {
  getContent: () => string[];
} & IBase;

export type InteractFn<T> = (e: React.MouseEvent, node: T) => void;

export enum InteractionType {
  ClickTag = "ClickTag",
  ClickAttribute = "ClickAttribute",
  ClickValue = "ClickValue",
}
