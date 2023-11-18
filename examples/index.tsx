import { render } from "solid-js/web";
import { For, JSX } from "solid-js";
import { A, Route, Router, Routes } from "@solidjs/router";
import { SimpleExample } from "@/simple";
import { OutputExample } from "@/output";

const root = document.getElementById("root");

if (!(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

type TestRouteDef = {
  name: string,
  route: string,
  component: () => JSX.Element,
}

const ROUTES: readonly TestRouteDef[] = [
  { name: "Simple Example", route: "/", component: SimpleExample },
  { name: "Output Example", route: "/output", component: OutputExample }
] as const;

const App = () => (
  <div>
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
  </div>
);

render(() => (
  <Router>
    <App />
  </Router>
), root);
