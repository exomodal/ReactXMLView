import { nanoid } from "nanoid";
import { useTreeStore } from "store";
import { Node, StateAttribute, StateNode, StateType, isValue } from "../types";

export const useBuildTree = (rawTree: Node) => {
  const setTree = useTreeStore((s) => s.setTree);

  const buildNode = (
    treeRef: Record<string, StateNode | StateAttribute>,
    node: Node,
    parentId?: string
  ) => {
    const id = nanoid();
    const children = node.children || [];

    const values: string[] = [];
    const childNodes: string[] = [];

    children.forEach((child) => {
      if (isValue(child)) {
        values.push(child.value);
      } else {
        childNodes.push(buildNode(treeRef, child, id));
      }
    });

    const attributes = Object.entries(node.attributes || {});
    const attributeIds = attributes.map(([key, value]) => {
      const attributeId = nanoid();

      treeRef[attributeId] = {
        type: StateType.Attribute,
        key,
        value,
        parentId: id,
      };

      return attributeId;
    });

    treeRef[id] = {
      type: StateType.Node,
      name: node.name,
      attributeIds,
      values,
      parentId: parentId || null,
      children: childNodes,
    };

    return id;
  };

  const buildTree = (node: Node) => {
    const tree: Record<string, StateNode> = {};

    buildNode(tree, node);
    setTree(tree);

    return tree;
  };

  const tree = buildTree(rawTree);
  const getRootId = () => {
    const id = Object.entries(tree).find(
      ([_, node]) => node.parentId === null
    )?.[0];

    if (id === undefined) {
      throw new Error("Root node not found");
    }

    return id;
  };

  return getRootId();
};
