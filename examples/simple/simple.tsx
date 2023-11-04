import { render } from "solid-js/web";
import { ModalProvider, useModalOpener } from "../../src/context";
import { ModalProps } from "../../src/types";

const root = document.getElementById("root");

if (!(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => (
  <ModalProvider>
    <MyButtons />
  </ModalProvider>
), root);

const MyButtons = () => {
  const openModal = useModalOpener();
  const input = "Something";

  const handleFirstButtonClick = () => {
    openModal(MyModalWithoutInput);
    return;
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
    <>
      <button onClick={handleFirstButtonClick}>Open modal without input</button>
      <button onClick={handleSecondButtonClick}>Open modal with title: {input}</button>
    </>
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
