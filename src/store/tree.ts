import {
  ElementType,
  StateAttribute,
  StateNode,
  isAttribute,
  isNode,
} from "types";
import {
  IAttribute,
  INode,
  IValue,
  InteractFn,
  InteractionType,
} from "types/interaction";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TreeStore = {
  tree: Record<string, StateNode | StateAttribute>;

  setTree: (tree: Record<string, StateNode | StateAttribute>) => void;

  setInteraction: <T>(
    fn: InteractFn<T> | undefined,
    type: InteractionType
  ) => void;

  onClickTag: InteractFn<INode> | undefined;
  onClickAttribute: InteractFn<IAttribute> | undefined;
  onClickValue: InteractFn<IValue> | undefined;

  getType: (id: string) => string;

  _node: (id: string) => {
    getName: () => string;
    getAttributeIds: () => string[];
    getValues: () => string[];
    getChildren: () => string[];
  };

  node: (id: string) => INode;
  attribute: (id: string) => IAttribute;
  value: (id: string) => IValue;
};

export const useTreeStore = create<TreeStore>()(
  immer((set, get) => ({
    tree: {},

    setTree: (tree) => set({ tree }),

    setInteraction: (fn, type) => {
      switch (type) {
        case InteractionType.ClickTag:
          set((s) => {
            s.onClickTag = fn as InteractFn<INode>;
          });
          break;
        case InteractionType.ClickAttribute:
          set((s) => {
            s.onClickAttribute = fn as InteractFn<IAttribute>;
          });
          break;
        case InteractionType.ClickValue:
          set((s) => {
            s.onClickValue = fn as InteractFn<IValue>;
          });
          break;
        default:
          throw "Unsupported interaction";
      }
    },

    onClickTag: undefined,
    onClickAttribute: undefined,
    onClickValue: undefined,

    getType: (id) => get().tree[id].type,

    _node: (id) => {
      const node = get().tree[id];

      if (!isNode(node)) throw "Node not found";

      return {
        getName: () => node.name,
        getAttributeIds: () => node.attributeIds,
        getValues: () => node.values,
        getChildren: () => node.children,
      };
    },

    node: (id) => {
      const node = get().tree[id];

      if (!isNode(node)) throw "Node not found";

      return {
        setClassName: (name) => {
          throw "Not implemented";
        },
        getPath: () => {
          const path = [node.name];
          if (node.parentId === null) return path;

          let parent: INode | null = get().node(node.parentId);
          while (parent !== null) {
            path.push(parent.getName());

            parent = parent.getParent();
          }

          return path.reverse();
        },
        getParent: () =>
          node.parentId !== null ? get().node(node.parentId) : null,
        getName: () => node.name,
        getAttributes: () => node.attributeIds.map(get().attribute),
        getValues: () => node.values,
        getChildren: () => node.children.map(get().node),
      };
    },

    attribute: (id) => {
      const attr = get().tree[id];

      if (!isAttribute(attr)) throw "Attribute not found";

      return {
        setClassName: (name) => {
          throw "Not implemented";
        },
        getPath: () => {
          const path = [attr.key];
          if (attr.parentId === null) return path;

          let parent: INode | null = get().node(attr.parentId);
          while (parent !== null) {
            path.push(parent.getName());

            parent = parent.getParent();
          }

          return path.reverse();
        },
        getParent: () =>
          attr.parentId !== null ? get().node(attr.parentId) : null,
        getKey: () => attr.key,
        getValue: () => attr.value,
      };
    },

    value: (id) => {
      const node = get().tree[id];

      if (!isNode(node)) throw "Node not found";

      return {
        setClassName: (name) => {
          throw "Not implemented";
        },
        getPath: () => {
          const path = [node.name];
          if (node.parentId === null) return path;

          let parent: INode | null = get().node(node.parentId);
          while (parent !== null) {
            path.push(parent.getName());

            parent = parent.getParent();
          }

          return path.reverse();
        },
        getParent: () =>
          node.parentId !== null ? get().node(node.parentId) : null,
        getContent: () => node.values,
      };
    },
  }))
);
