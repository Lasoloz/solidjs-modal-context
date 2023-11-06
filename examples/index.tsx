// TODO: Create examples npm subproject

import { render } from "solid-js/web";
import { For } from "solid-js";
import { ModalProvider } from "@lib";
import { A, Route, Router, Routes } from "@solidjs/router";
import { SimpleExample } from "@/simple";

const root = document.getElementById("root");

if (!(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

const ROUTES = [
  { name: "Simple Example", route: "/", component: SimpleExample }
] as const;

render(() => (
  <Router>
    <ModalProvider>
      <h1>Simple modal examples using `solidjs-modal-context`</h1>
      <ul>
        <For each={ROUTES}>
          {item => <li><A href={item.route}>{item.name}</A></li>}
        </For>
      </ul>
      <Routes>
        <For each={ROUTES}>
          {item => <Route path={item.route} component={item.component} />}
        </For>
      </Routes>
    </ModalProvider>
  </Router>
), root);
