import { FlowProps } from "solid-js";

export const SimpleModal = (props: FlowProps) => (
  <div
    style="border: 1px solid black; border-radius: 8px; padding: 0.5em 1.5em; background: white; min-width: 600px; display: flex; flex-direction: column; gap: 0.25em;">
    {props.children}
  </div>
);
