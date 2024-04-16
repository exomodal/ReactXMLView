import { forwardRef } from "react";

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
