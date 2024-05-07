export enum ElementType {
  Tag = "Tag",
  Attribute = "Attribute",
  Value = "Value",
}

export enum StateType {
  Node = "Node",
  Attribute = "Attribute",
}

export type StateNode = {
  type: StateType.Node;
  name: string;
  attributes: Record<string, string>;
  values: string[];
  styling?: string;
  parentId: string | null;
  children: string[];
};
