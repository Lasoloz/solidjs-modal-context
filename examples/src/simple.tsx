import { ModalProps, useModalOpener } from "@lib";
import { FlowProps } from "solid-js";

export const SimpleExample = () => {
  const openModal = useModalOpener();
  const input = "Something";

  const handleFirstButtonClick = () => {
    openModal(MyModalWithoutInput);
  };
  const handleSecondButtonClick = () => {
    openModal(MyModalWithInput, { input });
  };
  // noinspection JSUnusedLocalSymbols
  const typeExamples = () => {
    openModal(MyModalWithoutInput, {}); // It's fine
    openModal(MyModalWithoutInput, { input: "something" }); // It's also fine // TODO: Fix me?
    // openModal(MyModalWithInput); // Error, yay!
  };

  return (
    <div>
      <h2>Open simple modals</h2>
      <button onClick={handleFirstButtonClick}>Open modal without input</button>
      <button onClick={handleSecondButtonClick}>Open modal with title: {input}</button>
    </div>
  );
};

const MyModalWithoutInput = (_: ModalProps) => (
  <SimpleModal>
    <p>My simple modal</p>
  </SimpleModal>
);

const MyModalWithInput = (props: ModalProps<string>) => (
  <SimpleModal>
    <p>My modal with input: {props.input}</p>
  </SimpleModal>
);

const SimpleModal = (props: FlowProps) => (
  <div style="border: 1px solid black; border-radius: 8px; padding: 0.5em 1.5em; background: white; min-width: 600px">
    {props.children}
  </div>
);
