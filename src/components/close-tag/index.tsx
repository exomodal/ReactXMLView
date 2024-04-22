import { useTreeStore } from "store/tree";

export const CloseTag = ({ id }: { id: string }) => {
  const [node, onClick] = useTreeStore((s) => [s.node(id), s.onClickTag]);
  const { getName } = node;

  return (
    <span
      style={{ color: "#0078d4" }}
      onClick={onClick && ((e) => onClick(e, node))}
    >
      <span>{"</"}</span>
      <span>{getName()}</span>
      <span>{">"}</span>
    </span>
  );
};
