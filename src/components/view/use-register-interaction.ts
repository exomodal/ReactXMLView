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
    setInteraction(onClickTag, InteractionType.ClickTag);
  }, [onClickTag]);

  useEffect(() => {
    setInteraction(onClickAttribute, InteractionType.ClickAttribute);
  }, [onClickAttribute]);

  useEffect(() => {
    setInteraction(onClickValue, InteractionType.ClickValue);
  }, [onClickValue]);
};
