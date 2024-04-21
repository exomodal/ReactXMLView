import { X2jOptions, XMLParser } from "fast-xml-parser";
import { Node } from "../types";
import { useEffect, useMemo, useState } from "react";

export const useXmlParser = (
  config: X2jOptions | undefined,
  xml: string = ""
): Node | null => {
  const [parser, setParser] = useState<XMLParser | null>(null);

  useEffect(() => {
    setParser(
      new XMLParser({
        preserveOrder: true,
        ignoreAttributes: false,
        ignoreDeclaration: true,
        attributeNamePrefix: "",
        allowBooleanAttributes: true,
        ...config,
        textNodeName: "#text",
      })
    );
  }, [config]);

  const parseJSON = (json: any): any => {
    if (json === null || typeof json !== "object") {
      return json;
    }

    if (Array.isArray(json)) {
      return json.map(parseJSON).filter((node) => node !== null || node !== "");
    }

    const result: Record<string, any> = {};

    for (const key in json) {
      if (key === "#text") {
        return { value: json[key] };
      }

      if (key === ":@") {
        result["attributes"] = json[key];
        continue;
      }

      result["name"] = key;

      const children = parseJSON(json[key]);
      if (children.length > 0) {
        result["children"] = children;
      }
    }

    return result;
  };

  return useMemo(
    () => parseJSON(parser ? parser.parse(xml)[0] : null),
    [xml, parser]
  );
};
