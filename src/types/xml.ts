export type Value = {
  value: string;
};

export type Node = {
  name: string;
  attributes?: Record<string, string>;
  children?: (Node | Value)[];
};

export const isValue = (node: Node | Value): node is Value => {
  return "value" in node;
};
