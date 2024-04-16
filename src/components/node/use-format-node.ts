import { useWindowResize } from "hooks/use-window-resize";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTreeStore } from "store";

export const useFormatNode = (
  id: string,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const { getChildren } = useTreeStore((s) => s.node(id));
  const [internalOffset, setInternalOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const nodeRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  const { width, height } = useWindowResize();

  const noChildren = getChildren().length === 0;

  const toggleExpanded = (expand: boolean) => {
    const node = nodeRef.current;

    if (node === null) {
      return;
    }

    if (!expand) {
      node.style.setProperty("display", "flex");
    } else {
      node.style.setProperty("display", "inline");
    }

    setExpanded(expand);
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
    const node = nodeRef.current;
    const value = valueRef.current;

    if (node === null || value === null) {
      return;
    }
    if (!noChildren) {
      return;
    }

    if (fitsHorizontal() || !expanded) {
      node.style.setProperty("display", "flex");
      value.style.setProperty("margin-left", "0");
    } else {
      node.style.setProperty("display", "inline");
      value.style.setProperty("margin-left", "2.5rem");
    }
  };

  useEffect(() => {
    formatNode();
  }, [width, height, getChildren(), expanded]);

  useEffect(() => {
    const node = nodeRef.current;
    if (node === null) {
      return;
    }

    const display = node.style.getPropertyValue("display");

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
