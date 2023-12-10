import { JSX } from "solid-js";
import { MaybeFlowProps } from "./common-types";

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
  & (O extends undefined ? { onClose: () => void } : { onClose: (data: O) => void })
  & ({ openForwarding: ForwardOpener<O> });

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
  & (O extends undefined ? { onClose?: () => void } : { onClose?: (data: O) => void })
  & (
  { onCancel?: () => void }
  | { cancelable: true, onCancel?: () => void }
  | { cancelable?: false }
  );

/**
 * Modal data for opening a modal from a modal (thus replacing it)
 *
 * @example
 * Opening an inner modal with custom input
 * ```
 * const MyInnerModal = (props: ModalProps<number>) => {
 *   // Omitted
 * }
 * const MyModal = (props: ModalProps<string>) => {
 *   const handleOpen = () => {
 *     props.openForwarding(MyInnerModal, 2);
 *   };
 *   return (<button onClick={handleOpen}>Open inner modal</button>);
 * }
 * ```
 */
export type ForwardModalData<I = undefined> = I extends undefined ? {} : { input: I };
/**
 * Opener method for opening (replacing) a modal from another modal
 *
 * @example
 * Opening an inner modal with custom output
 * ```
 * const MyInnerModal = (props: ModalProps<undefined, string>) => {
 *   // Omitted
 * }
 * const MyModal = (props: ModalProps<string, string>) => {
 *   const handleOpen = () => {
 *     props.openForwarding(MyInnerModal, { props.input });
 *   };
 *   return (<button onClick={handleOpen}>Open inner modal</button>);
 * }
 * const MyProblematicInnerModal = (props: ModalProps<undefined, number>) => {
 *   // Omitted                                                  ^ wrong output type
 * }
 * ```
 */
export type ForwardOpener<O = undefined> = {
  (modal: ModalComponent<undefined, O>): void;
  <I>(modal: ModalComponent<I, O>, data: ForwardModalData<I>): void;
}

/**
 * Props for the {@link ModalProvider}.
 *
 * * `defaultCancelable` - whether modals are cancelable by default if `cancelable` flag is
 *   not provided when the modal is opened. Defaults to true.
 */
export type ModalProviderProps = MaybeFlowProps<{
  defaultCancelable?: boolean;
  backdropClass?: string;
  backdropStyle?: string;
  modalRootClass?: string;
  modalRootStyle?: string;
}>;

// TODO: Think about better modal closing options (e.g. return function after modal opening
//  or a generic modal closing/popping method)
/**
 * Type of modal opener function returned by {@link useModalOpener}.
 */
export type ModalOpener = {
  <O = undefined>(component: ModalComponent<undefined, O>): void;
  <I = undefined, O = undefined>(component: ModalComponent<I, O>, data: ModalData<I, O>): void;
};
