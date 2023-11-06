import { ModalProps, useModalOpener } from "@lib";

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
  <div style="border: 1px solid black;">
    <p>My simple modal</p>
  </div>
);

const MyModalWithInput = (props: ModalProps<string>) => (
  <div style="border: 1px solid black;">
    <p>My modal with input: {props.input}</p>
  </div>
);
