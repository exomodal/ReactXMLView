import { useWindowResize } from "hooks/use-window-resize";
import { Node, Value, isValue } from "hooks/use-xml-parser";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useFormatNode = (
  containerRef: React.RefObject<HTMLDivElement>,
  children: (Node | Value)[]
) => {
  const [internalOffset, setInternalOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const nodeRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  const { width, height } = useWindowResize();

  const onlyValueChildren = useMemo(
    // With no children we can default to false as there is nothing to render.
    () => children.every((element) => isValue(element)) || false,
    [children]
  );

  const toggleExpanded = (expand: boolean) => {
    setExpanded(expand);

    if (!expand) {
      nodeRef.current?.style.setProperty("display", "flex");
    } else {
      nodeRef.current?.style.setProperty("display", "inline");
    }
  };

  const fitsHorizontal = () => {
    const textLength = (valueRef.current?.textContent?.length || 0) * 10;
    const width =
      (containerRef.current?.offsetWidth || 0) -
      (tagRef.current?.offsetWidth || 0) * 2 -
      textLength;

    return width > 0;
  };

  const offsetTagRef = useCallback((node: HTMLSpanElement) => {
    if (node !== null) {
      setOffset(node.offsetWidth);
      setInternalOffset(node.offsetWidth);
    }
  }, []);

  const formatNode = () => {
    if (!onlyValueChildren) {
      return;
    }

    if (fitsHorizontal() || !expanded) {
      nodeRef.current?.style.setProperty("display", "flex");
      valueRef.current?.style.setProperty("margin-left", "0");
    } else {
      nodeRef.current?.style.setProperty("display", "inline");
      valueRef.current?.style.setProperty("margin-left", "2.5rem");
    }
  };

  useEffect(() => {
    formatNode();
  }, [width, height, children, expanded]);

  useEffect(() => {
    const display = nodeRef.current?.style.getPropertyValue("display");

    if (display === "flex") {
      setOffset(0);
    }
    if (display === "inline") {
      setOffset(internalOffset);
    }
  }, [expanded, offset, internalOffset]);

  return {
    nodeRef,
    tagRef,
    valueRef,
    expanded,
    toggleExpanded,
    offset,
    offsetTagRef,
  };
};
