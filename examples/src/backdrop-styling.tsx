import { ModalProvider, useModalOpener } from "@lib";
import { SimpleModal } from "@/utils";

export const BackdropStylingExample = () => (
  <ModalProvider
    backdropClass="modal-backdrop red-ish"
    backdropStyle="border: 2em dotted #202020"
    modalRootClass="padded"
    modalRootStyle="border: 2px dashed black"
  >
    <Example />
  </ModalProvider>
);

const Example = () => {
  const openModal = useModalOpener();

  const handleButtonClick = () => {
    openModal(MyModal);
  };

  return (
    <div>
      <h2>Open modal with styled backdrop</h2>
      <button onClick={handleButtonClick}>Open modal</button>
    </div>
  );
};

const MyModal = () => (
  <SimpleModal>
    <p>My simple modal with a styled backdrop</p>
  </SimpleModal>
);
