import { useTreeStore } from "store/tree";

export const Attribute = ({ id }: { id: string }) => {
  const [attribute, onClick] = useTreeStore((s) => [
    s.attribute(id),
    s.onClickAttribute,
  ]);
  const { getKey, getValue } = attribute;

  return (
    <span onClick={onClick && ((e) => onClick(e, attribute))}>
      <span style={{ color: "#B24C63" }}>{` ${getKey()}`}</span>
      <span>=</span>
      <span style={{ color: "#919A67" }}>"{getValue()}"</span>
    </span>
  );
};
