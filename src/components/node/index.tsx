import { forwardRef } from "react";
import { Node, isValue } from "hooks/use-xml-parser";
import { useFormatNode } from "./use-format-node";

interface NodeViewProps extends Node {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const NodeView = ({
  name,
  attributes,
  children,
  containerRef,
}: NodeViewProps) => {
  const {
    nodeRef,
    tagRef,
    valueRef,
    expanded,
    toggleExpanded,
    offset,
    offsetTagRef,
  } = useFormatNode(containerRef, children || []);

  return (
    <div ref={nodeRef}>
      <div ref={tagRef} style={{ width: "fit-content", color: "#0078d4" }}>
        {children && (
          <ExpandButton
            ref={offsetTagRef}
            expanded={expanded}
            setExpanded={toggleExpanded}
          />
        )}
        <OpeningTag name={name} attributes={attributes} />
      </div>

      <div style={{ display: expanded ? undefined : "none" }}>
        {children?.map((node, index) => {
          if (isValue(node)) {
            return (
              <div
                ref={valueRef}
                key={index}
                style={{
                  width: "fit-content",
                  color: "#272932",
                }}
              >
                {node.value}
              </div>
            );
          }

          return (
            <div
              key={index}
              style={{
                marginLeft: "1.5rem",
              }}
            >
              <NodeView {...node} containerRef={containerRef} />
            </div>
          );
        })}
      </div>
      <div style={{ display: expanded ? "none" : undefined }}>...</div>

      {children && (
        <div style={{ marginLeft: `${offset}px` }}>
          <ClosingTag name={name} />
        </div>
      )}
    </div>
  );
};

export const ExpandButton = forwardRef<
  HTMLSpanElement,
  {
    expanded: boolean;
    setExpanded: (expand: boolean) => void;
  }
>(({ expanded, setExpanded }, ref) => {
  return (
    <span
      ref={ref}
      style={{ color: "#0078d4", cursor: "pointer", paddingRight: "0.5rem" }}
      onClick={() => setExpanded(!expanded)}
    >
      {expanded ? "-" : "+"}
    </span>
  );
});

export const TagAttribute = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  return (
    <span>
      <span style={{ color: "#B24C63" }}>{` ${name}`}</span>
      <span>=</span>
      <span style={{ color: "#919A67" }}>"{value}"</span>
    </span>
  );
};

export const OpeningTag = ({
  name,
  attributes,
}: {
  name: string;
  attributes?: Record<string, string>;
}) => {
  return (
    <span style={{ color: "#0078d4" }}>
      <span>{"<"}</span>
      <span>{name}</span>
      {attributes &&
        Object.entries(attributes).map(([key, value]) => (
          <TagAttribute key={key} name={key} value={value} />
        ))}
      <span>{">"}</span>
    </span>
  );
};

export const ClosingTag = ({ name }: { name: string }) => {
  return (
    <span style={{ color: "#0078d4" }}>
      <span>{"</"}</span>
      <span>{name}</span>
      <span>{">"}</span>
    </span>
  );
};
