import { useTreeStore } from "store/tree";

export const useInteractiveXml = () => {
  const [node, attribute, value] = useTreeStore((s) => [
    s.node,
    s.attribute,
    s.value,
  ]);

  const getNode = (id: string) => {
    return node(id);
  };

  const getAttribute = (id: string, key: string) => {
    return attribute(id, key);
  };

  const getValue = (id: string) => {
    return value(id);
  };

  return { getNode, getAttribute, getValue };
};
