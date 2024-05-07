import { nanoid } from "nanoid";
import { useTreeStore } from "store";
import { Node, StateNode, StateType, isValue } from "../types";
import { useMemo } from "react";

export const useBuildTree = (rawTree: Node | null) => {
  const setTree = useTreeStore((s) => s.setTree);

  const buildNode = (
    treeRef: Record<string, StateNode>,
    node: Node,
    parentId?: string
  ) => {
    // TODO: deterministic id generation
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

    treeRef[id] = {
      type: StateType.Node,
      name: node.name,
      attributes: node.attributes || {},
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

  const getRootId = (tree: Node) => {
    const id = Object.entries(buildTree(tree)).find(
      ([_, node]) => node.parentId === null
    )?.[0];

    if (id === undefined) {
      throw new Error("Root node not found");
    }

    return id;
  };

  return useMemo(() => (rawTree ? getRootId(rawTree) : null), [rawTree]);
};
