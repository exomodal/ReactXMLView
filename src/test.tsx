import { XmlView } from "index";
import { ElementType } from "types";

export const MyComponent = () => {
  <XmlView
    xml={`<root></root>`}
    onClickTag={() => {}}
    onClickAttribute={() => {}}
  />;
};
