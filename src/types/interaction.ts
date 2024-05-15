export type IBase = {
  setClassName: (name: string) => void;
  getPath: () => string[];
};

export type IAttribute = {
  getNode: () => INode;
  getKey: () => string;
  getValue: () => string;
} & IBase;

export type INode = {
  getId: () => string;
  getParent: () => INode | null;
  getName: () => string;
  getAttributes: () => IAttribute[];
  getValues: () => string[];
  getChildren: () => INode[];
} & IBase;

export type IValue = {
  getNode: () => INode;
  getName: () => string;
  getContent: () => string[];
} & IBase;

export type InteractFn<T> = (e: React.MouseEvent, node: T) => void;

export enum InteractionType {
  ClickTag = "ClickTag",
  ClickAttribute = "ClickAttribute",
  ClickValue = "ClickValue",
}
