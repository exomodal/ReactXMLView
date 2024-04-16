import { useEffect } from "react";
import { useTreeStore } from "store/tree";
import {
  IAttribute,
  INode,
  IValue,
  InteractFn,
  InteractionType,
} from "../../types/interaction";

interface InteractionProps {
  onClickTag?: InteractFn<INode>;
  onClickAttribute?: InteractFn<IAttribute>;
  onClickValue?: InteractFn<IValue>;
}

export const useRegisterInteraction = ({
  onClickTag,
  onClickAttribute,
  onClickValue,
}: InteractionProps) => {
  const setInteraction = useTreeStore((s) => s.setInteraction);

  useEffect(() => {
    if (onClickTag) {
      setInteraction(onClickTag, InteractionType.ClickTag);
    }
  }, [onClickTag]);

  useEffect(() => {
    if (onClickAttribute) {
      setInteraction(onClickAttribute, InteractionType.ClickAttribute);
    }
  }, [onClickAttribute]);

  useEffect(() => {
    if (onClickValue) {
      setInteraction(onClickValue, InteractionType.ClickValue);
    }
  }, [onClickValue]);
};
