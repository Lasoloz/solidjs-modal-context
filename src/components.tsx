import { ModalState } from "./common";
import { Dynamic } from "solid-js/web";

export type ModalRendererProps = {
  state: ModalState<unknown>;
  close: () => void;
};

export const ModalRenderer = (props: ModalRendererProps) => {
  const state = () => props.state;

  return (
    <div>
      <Dynamic component={state().component} input={state().data.input} />
    </div>
  );
};
