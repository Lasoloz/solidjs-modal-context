import { ModalComponent, ModalData } from "./types";
import { Dynamic } from "solid-js/web";

const DEFAULT_BACKDROP_STYLE = "width: 100vw; height: 100vh; position: fixed; left: 0; top: 0;" +
  "background-color: rgba(180, 180, 180, 25%); backdrop-filter: blur(4px);" +
  "display: flex; justify-content: center; align-items: center;";

export type ModalState<I = undefined, O = undefined> = { component: ModalComponent<I, O>, data: ModalData<I, O> };

export type ModalRendererProps = {
  state: ModalState<unknown, unknown>;
  onClose: () => void;
  fallbackCancelable: boolean;
  backdropClass?: string;
  backdropStyle?: string;
};

export const ModalRenderer = (props: ModalRendererProps) => {
  const state = () => props.state;

  const createOutsideClick = () => {
    const data = state().data;

    if ("onCancel" in data) {
      const onCancelCallback = data.onCancel;
      if (onCancelCallback != null) {
        return () => {
          onCancelCallback();
          props.onClose();
        };
      }
    }

    // @ts-ignore We don't care, that cancelable might not exist
    if (!("cancelable" in data) && props.fallbackCancelable || data.cancelable) {
      return () => props.onClose();
    }

    return () => {
    };
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
      style={
        (props.backdropClass == null && props.backdropStyle == null)
          ? DEFAULT_BACKDROP_STYLE
          : props.backdropStyle
      }
      class={props.backdropClass}
      onClick={createOutsideClick()}
    >
      <div onClick={e => e.stopPropagation()}>
        <Dynamic component={state().component} input={state().data.input} onClose={createModalClose()} />
      </div>
    </div>
  );
};
