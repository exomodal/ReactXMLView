import { ItemView } from "components/node";
import { X2jOptions } from "fast-xml-parser";
import { useBuildTree } from "hooks/use-build-tree";
import { useXmlParser } from "hooks/use-xml-parser";
import { useRef } from "react";
import { IAttribute, INode, IValue, InteractFn } from "types/interaction";
import { useRegisterInteraction } from "./use-register-interaction";

export interface ViewProps {
  xml: string;
  parseConfig?: X2jOptions;

  onClickTag?: InteractFn<INode>;
  onClickAttribute?: InteractFn<IAttribute>;
  onClickValue?: InteractFn<IValue>;
}

export const View = ({ xml, parseConfig, ...onClickFns }: ViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawTree = useXmlParser(parseConfig, xml);
  const rootId = useBuildTree(rawTree);

  useRegisterInteraction(onClickFns);

  if (rootId === undefined) {
    return null;
  }

  return (
    <div ref={containerRef} style={{ fontFamily: "Monaco" }}>
      <ItemView id={rootId} containerRef={containerRef} />
    </div>
  );
};
