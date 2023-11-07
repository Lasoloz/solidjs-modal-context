import { ModalComponent, ModalData } from "./types";
import { FlowProps, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

export type ModalState<I = undefined> = { component: ModalComponent<I>, data: ModalData<I> };

/**
 * Custom Props definition that looks like {@link FlowProps}, but the `children` can be optional.
 */
export type MaybeFlowProps<P = {}, C = JSX.Element> = P & { children?: C };

export type ModalRendererProps = {
  state: ModalState<unknown>;
  close: () => void;
};

export const ModalRenderer = (props: ModalRendererProps) => {
  const state = () => props.state;

  const handleOutsideClick = () => {
    props.close();
  };

  return (
    <div
      style="width: 100vw; height: 100vh; position: fixed; left: 0; top: 0;
        background-color: rgba(180, 180, 180, 25%); backdrop-filter: blur(4px);
        display: flex; justify-content: center; align-items: center;"
      onClick={handleOutsideClick}
    >
      <div onClick={e => e.stopPropagation()}>
        <Dynamic component={state().component} input={state().data.input} />
      </div>
    </div>
  );
};
