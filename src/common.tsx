import { ModalComponent, ModalData } from "./types";
import { Dynamic } from "solid-js/web";

export type ModalState<I = undefined, O = undefined> = { component: ModalComponent<I, O>, data: ModalData<I, O> };

export type ModalRendererProps = {
  state: ModalState<unknown, unknown>;
  onClose: () => void;
};

// TODO: Rename it to ModalHost in the future?
export const ModalRenderer = (props: ModalRendererProps) => {
  const state = () => props.state;

  const handleOutsideClick = () => {
    // TODO: Closing doesn't return data, disable outside click for modals without data
    props.onClose();
  };

  const createModalClose = () => {
    const onCloseCallback = state().data.onClose;
    if (onCloseCallback == null) {
      return props.onClose;
    }

    return (data?: unknown) => {
      onCloseCallback(data);
      props.onClose();
    };
  };

  return (
    <div
      style="width: 100vw; height: 100vh; position: fixed; left: 0; top: 0;
        background-color: rgba(180, 180, 180, 25%); backdrop-filter: blur(4px);
        display: flex; justify-content: center; align-items: center;"
      onClick={handleOutsideClick}
    >
      <div onClick={e => e.stopPropagation()}>
        <Dynamic component={state().component} input={state().data.input} onClose={createModalClose()} />
      </div>
    </div>
  );
};
