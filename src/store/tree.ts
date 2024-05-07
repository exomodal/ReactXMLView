import { StateNode } from "types";
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
  tree: Record<string, StateNode>;

  setTree: (tree: Record<string, StateNode>) => void;

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
    getAttributes: () => string[];
    getValues: () => string[];
    getChildren: () => string[];
  };

  node: (id: string) => INode;
  attribute: (id: string, key: string) => IAttribute;
  value: (id: string) => IValue;
};

export const useTreeStore = create<TreeStore>()(
  immer((set, get) => ({
    tree: {},
    onClickTag: undefined,
    onClickAttribute: undefined,
    onClickValue: undefined,

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

    getType: (id) => {
      const node = get().tree[id];
      if (node === undefined) throw "Node not found";

      return node.type;
    },

    _node: (id) => {
      const node = get().tree[id];

      if (node === undefined) throw "Node not found";

      return {
        getName: () => node.name,
        getAttributes: () => Object.keys(node.attributes),
        getValues: () => node.values,
        getChildren: () => node.children,
      };
    },

    node: (id) => {
      const node = get().tree[id];

      if (node === undefined) throw "Node not found";

      return {
        setClassName: (name) => {
          throw "Not implemented";
        },
        getId: () => id,
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
        getAttributes: () =>
          Object.keys(node.attributes).map((key) => get().attribute(id, key)),
        getValues: () => node.values,
        getChildren: () => node.children.map(get().node),
      };
    },

    attribute: (id, key) => {
      // TODO: Make secure call, possibly undefined
      const node = get().tree[id];

      if (node === undefined) throw "Node not found";

      return {
        setClassName: (name) => {
          throw "Not implemented";
        },
        getId: () => id,
        getPath: () => {
          const path = [key];
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
        getKey: () => key,
        getValue: () => {
          const value = node.attributes[key];
          if (value === undefined) throw "Attribute not found";

          return value;
        },
      };
    },

    value: (id) => {
      const node = get().tree[id];

      if (node === undefined) throw "Node not found";

      return {
        setClassName: (name) => {
          throw "Not implemented";
        },
        getId: () => id,
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
        getContent: () => node.values,
      };
    },
  }))
);
