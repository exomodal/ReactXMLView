import { NodeView } from "components/node";
import { X2jOptions } from "fast-xml-parser";
import { isValue, useXmlParser } from "hooks/use-xml-parser";
import { useRef } from "react";

export interface ViewProps {
  xml: string;
  parseConfig?: X2jOptions;
}

export const View = ({ xml, parseConfig }: ViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodes = useXmlParser(parseConfig, xml);

  return (
    <div ref={containerRef} style={{ fontFamily: "Monaco" }}>
      {nodes.map((node) => {
        if (isValue(node)) {
          return (
            <NodeView key={node.name} {...node} containerRef={containerRef} />
          );
        }

        return (
          <NodeView key={node.name} {...node} containerRef={containerRef} />
        );
      })}
    </div>
  );
};
