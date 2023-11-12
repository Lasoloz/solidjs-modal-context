import { FlowProps, JSX } from "solid-js";

/**
 * Custom Props definition that looks like {@link FlowProps}, but the `children` can be optional.
 */
export type MaybeFlowProps<P = {}, C = JSX.Element> = P & { children?: C };
