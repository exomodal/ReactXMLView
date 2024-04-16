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
  attributeIds: string[];
  values: string[];
  styling?: string;
  parentId: string | null;
  children: string[];
};

export type StateAttribute = {
  type: StateType.Attribute;
  key: string;
  value: string;
  parentId: string;
};

export const isNode = (node: StateNode | StateAttribute): node is StateNode => {
  return "type" in node && node.type === StateType.Node;
};

export const isAttribute = (
  node: StateNode | StateAttribute
): node is StateAttribute => {
  return "type" in node && node.type === StateType.Attribute;
};
