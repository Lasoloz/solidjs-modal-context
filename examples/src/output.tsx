import { ModalProps, useModalOpener } from "@lib";
import { createSignal, Show } from "solid-js";
import { SimpleModal } from "@/utils";

export const OutputExample = () => {
  const openModal = useModalOpener();
  const [output, setOutput] = createSignal<string | null>(null);

  const handleOpenOutputModal = () => {
    openModal(MyModalWithOutput, {
      onClose: data => setOutput(data)
    });
  };

  return (
    <div>
      <h2>Open modals with output</h2>
      <button onClick={handleOpenOutputModal}>Open modal with output</button>
      <Show when={output() != null} fallback={<p>No modal output registered yet</p>}>
        <p>Modal output: {output()}</p>
      </Show>
    </div>
  );
};

const MyModalWithOutput = (props: ModalProps<undefined, string>) => {
  const [data, setData] = createSignal("");

  const handleSubmit = () => {
    props.onClose(data());
  };

  return (
    <SimpleModal>
      <p>Please type something</p>
      <input type="text" value="" onInput={e => setData(e.target.value)} />
      <button onClick={handleSubmit} disabled={data().length === 0} style="width: 200px; align-self: end">Submit
      </button>
    </SimpleModal>
  );
};
