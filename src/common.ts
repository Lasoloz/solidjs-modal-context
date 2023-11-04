import { ModalComponent, ModalData } from "./types";
import { FlowProps, JSX } from "solid-js";

/**
 * Modal state used for rendering and by contextO
 */
export type ModalState<I = undefined> = { component: ModalComponent<I>, data: ModalData<I> };

/**
 * Custom Props definition that looks like {@link FlowProps}, but the `children` can be optional.
 */
export type MaybeFlowProps<P = {}, C = JSX.Element> = P & { children?: C };
