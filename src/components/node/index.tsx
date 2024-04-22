import { CloseTag } from "components/close-tag";
import { ExpandButton } from "components/expand-button";
import { OpenTag } from "components/open-tag";
import { useFormatNode } from "./use-format-node";
import { useTreeStore } from "store/tree";

export const ItemView = ({
  id,
  containerRef,
}: {
  id: string;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const [{ getChildren, getValues }, onClickValue, value] = useTreeStore(
    (s) => [s._node(id), s.onClickValue, s.value(id)]
  );

  const {
    nodeRef,
    tagRef,
    valueRef,
    expanded,
    toggleExpanded,
    offset,
    offsetTagRef,
  } = useFormatNode(id, containerRef);

  return (
    <div ref={nodeRef}>
      {/* The starting tag of the node. */}
      <div ref={tagRef} style={{ width: "fit-content", color: "#0078d4" }}>
        {getChildren().length > 0 && (
          <ExpandButton
            ref={offsetTagRef}
            expanded={expanded}
            setExpanded={toggleExpanded}
          />
        )}
        <OpenTag id={id} />
      </div>

      {/* Optional content between the starting and closing tag. */}
      <div style={{ display: expanded ? undefined : "none" }}>
        {getValues().length > 0 && (
          <div
            onClick={onClickValue && ((e) => onClickValue(e, value))}
            ref={valueRef}
            style={{
              width: "fit-content",
              color: "#272932",
            }}
          >
            {getValues().join("")}
          </div>
        )}

        {getChildren().map((id) => (
          <div
            key={id}
            style={{
              marginLeft: "2rem",
            }}
          >
            <ItemView key={id} id={id} containerRef={containerRef} />
          </div>
        ))}
      </div>
      <div style={{ display: expanded ? "none" : undefined }}>...</div>

      {/* Determine if we should have a closing tag, only relevant if we rendered something between the starting and closing tag. */}
      {(getChildren().length > 0 || getValues().length > 0) && (
        <div style={{ marginLeft: `${offset}px` }}>
          <CloseTag id={id} />
        </div>
      )}
    </div>
  );
};
