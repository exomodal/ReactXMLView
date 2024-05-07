import { Attribute } from "components/attribute";
import { useTreeStore } from "store/tree";

export const OpenTag = ({ id }: { id: string }) => {
  const [node, onClick] = useTreeStore((s) => [s.node(id), s.onClickTag]);
  const { getName } = node;
  const attributes = useTreeStore((s) => s._node(id).getAttributes());

  return (
    <span
      style={{ color: "#0078d4" }}
      onClick={onClick && ((e) => onClick(e, node))}
    >
      <span>{"<"}</span>
      <span>{getName()}</span>
      {attributes.map((key) => (
        <Attribute key={key} id={id} name={key} />
      ))}
      <span>{">"}</span>
    </span>
  );
};
