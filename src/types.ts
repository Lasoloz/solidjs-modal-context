import { JSX } from "solid-js";

/**
 * Prop type for modals.
 *
 * @example
 * Creating a component using ModalProps
 * ```
 * type MyModalInput = { title: string };
 * const MyModal = (props: ModalProps<MyModalInput>) => {
 *   // ...
 * }
 * ```
 */
export type ModalProps<I = undefined> = (I extends undefined ? {} : { input: I });

/**
 * Type definition for modal components
 *
 * Normally, {@link ModalProps} should be enough for defining modals.
 */
export type ModalComponent<I = undefined> = (props: ModalProps<I>) => JSX.Element;

/**
 * Modal data for customizing modals and providing input for them.
 *
 * @example
 * Opening a modal with custom data
 * ```
 * const MyButton = () => {
 *   const openModal = useModalOpener();
 *   const handleClick = () => {
 *     openModal(MyModal, { input: { title: "Test" } });
 *   };
 *   return <button onClick={handleClick}>Open my modal</button>
 * }
 * ```
 */
export type ModalData<I = undefined> = (I extends undefined ? {} : { input: I });
