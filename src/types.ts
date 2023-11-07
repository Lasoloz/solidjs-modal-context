import { JSX } from "solid-js";

/**
 * Prop type for modals.
 *
 * @example
 * Creating a component using ModalProps
 * ```
 * type MyModalInput = { title: string };
 * type MyModalOutput = { name: string };
 * const MyModal = (props: ModalProps<MyModalInput, MyModalOutput>) => {
 *   // ...
 * }
 * ```
 */
export type ModalProps<I = undefined, O = undefined> =
  (I extends undefined ? {} : { input: I })
  & (O extends undefined ? { onClose: () => void } : { onClose: (data: O) => void });

/**
 * Type definition for modal components
 *
 * Normally, {@link ModalProps} should be enough for defining modals.
 */
export type ModalComponent<I = undefined, O = undefined> = (props: ModalProps<I, O>) => JSX.Element;

/**
 * Modal data for customizing modals and providing input for them.
 *
 * @example
 * Opening a modal with custom data
 * ```
 * const MyButton = () => {
 *   const openModal = useModalOpener();
 *   const handleClick = () => {
 *     openModal(MyModal, {
 *       input: { title: "Test" },
 *       onClose: name => console.log(name)
 *     });
 *   };
 *   return <button onClick={handleClick}>Open my modal</button>
 * }
 * ```
 */
export type ModalData<I = undefined, O = undefined> =
  (I extends undefined ? {} : { input: I })
  & (O extends undefined ? { onClose?: () => void } : { onClose?: (data: O) => void });
