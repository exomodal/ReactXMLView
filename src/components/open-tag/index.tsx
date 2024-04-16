import { Attribute } from "components/attribute";
import { useTreeStore } from "store/tree";

export const OpenTag = ({ id }: { id: string }) => {
  const [node, onClick] = useTreeStore((s) => [s.node(id), s.onClickTag]);
  const { getName } = node;
  const attributeIds = useTreeStore((s) => s._node(id).getAttributeIds());

  return (
    <span style={{ color: "#0078d4" }} onClick={(e) => onClick(e, node)}>
      <span>{"<"}</span>
      <span>{getName()}</span>
      {attributeIds.map((id) => (
        <Attribute key={id} id={id} />
      ))}
      <span>{">"}</span>
    </span>
  );
};
