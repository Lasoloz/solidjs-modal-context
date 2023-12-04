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

  return (
    <div>
      <h2>Open modal with different output forwarding strategies</h2>
      <button onClick={openNoOutputModal}>Open no output modal</button>
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
