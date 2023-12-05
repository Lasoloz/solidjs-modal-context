import { ModalProps, ModalProvider, useModalOpener } from "@lib";
import { SimpleModal } from "@/utils";
import { createSignal } from "solid-js";

export const OutputForwardingExample = () => (
  <ModalProvider defaultCancelable={false}>
    <Example />
  </ModalProvider>
);

const Example = () => {
  const openModal = useModalOpener();
  const [output, setOutput] = createSignal("<INITIAL STATE>");

  const openNoOutputModal = () => {
    openModal(NoInputNoOutputModal, {
      onClose: () => {
        setOutput("<LAST MODAL HAS NO OUTPUT>");
      }
    });
  };

  const openStringOutputModal = () => {
    openModal(NoInputStringOutputModal, {
      onClose: data => {
        setOutput(`<OUTPUT>: ${data}`);
      }
    });
  };

  const openObjectOutputModal = () => {
    openModal(NoInputObjectOutputModal, {
      onClose: data => {
        setOutput(`<OUTPUT>: ${data.count}`);
      }
    });
  };

  const openCancelableModal = () => {
    openModal(NoInputStringOutputModal, {
      onClose: data => {
        setOutput(`<OUTPUT>: ${data}`);
      },
      onCancel: () => {
        setOutput("<LAST MODAL WAS CANCELED>");
      }
    });
  };

  const openModalWithoutHandler = () => {
    openModal(NoInputStringOutputModal);
  };

  return (
    <div>
      <h2>Open modal with different output forwarding strategies</h2>
      <button onClick={openNoOutputModal}>Open no output modal</button>
      <button onClick={openStringOutputModal}>Open string output modal</button>
      <button onClick={openObjectOutputModal}>Open object output modal</button>
      <button onClick={openCancelableModal}>Open cancelable string output modal</button>
      <button onClick={openModalWithoutHandler}>Open modal without output handling</button>
      <p>Last modal output: {output()}</p>
    </div>
  );
};

const NoInputNoOutputModal = (props: ModalProps) => {
  const handleClose = () => {
    props.onClose();
  };

  const openInnerModal = () => {
    props.openForwarding(
      StringInputNoOutputModal,
      { input: "Opened from no input/no output modal" }
    );
    // props.openForwarding(NoInputStringOutputModal); // Error, Yay!
    // props.openForwarding(StringInputStringOutputModal, { input: "Hello" }); // Error, Yay!
  };

  const reopenSelf = () => {
    props.openForwarding(NoInputNoOutputModal);
  };

  return (
    <SimpleModal>
      <p>Simple modal with no output</p>
      <button onClick={openInnerModal}>Inner modal</button>
      <button onClick={reopenSelf}>Reopen self</button>
      <button onClick={handleClose}>Close</button>
    </SimpleModal>
  );
};

const StringInputNoOutputModal = (props: ModalProps<string>) => {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <SimpleModal>
      <p>Another simple modal with no output.</p>
      <p>Input: {props.input}</p>
      <button onClick={handleClose}>Close</button>
    </SimpleModal>
  );
};

const NoInputStringOutputModal = (props: ModalProps<undefined, string>) => {
  const [data, setData] = createSignal("");
  let ref: HTMLInputElement;

  const handleClose = () => {
    props.onClose(data());
  };

  const handleOpenStringModal = () => {
    props.openForwarding(StringInputStringOutputModal, { input: data() });
    // props.openForwarding(NoInputObjectOutputModal); // Error, yay!
    // props.openForwarding(NoInputNoOutputModal); // Error, yay
  };

  const handleReopenSelf = () => {
    // clear data, because component won't be recreated
    setData("");
    ref.value = "";
    // TODO: Document ^this catch in the readme
    props.openForwarding(NoInputStringOutputModal);
  };

  return (
    <SimpleModal>
      <p>Simple modal with string output</p>
      <input type="text" value="" onInput={e => setData(e.target.value)} ref={ref!} />
      <button onClick={handleOpenStringModal}>Open modal with input from above</button>
      <button onClick={handleReopenSelf}>Reopen self</button>
      <button onClick={handleClose}>Close submitting</button>
    </SimpleModal>
  );
};

const StringInputStringOutputModal = (props: ModalProps<string, string>) => {
  const [data, setData] = createSignal(props.input);

  const handleClose = () => {
    props.onClose(data());
  };

  return (
    <SimpleModal>
      <p>Simple modal with string input and string output</p>
      <p>Input was: {props.input.trim() === "" ? "<NOTHING>" : props.input}</p>
      <input type="text" value={props.input} onInput={e => setData(e.target.value)} />
      <button onClick={handleClose}>Close submitting</button>
    </SimpleModal>
  );
};

const NoInputObjectOutputModal = (props: ModalProps<undefined, { count: number }>) => {
  const [data, setData] = createSignal(0);

  const handleClose = () => {
    props.onClose({ count: data() });
  };

  return (
    <SimpleModal>
      <p>Simple modal with object output</p>
      <input
        type="number"
        value="0"
        min="-10"
        max="+10"
        step="1"
        onInput={e => setData(parseInt(e.target.value))}
      />
      <button onClick={handleClose}>Close submitting</button>
    </SimpleModal>
  );
};
