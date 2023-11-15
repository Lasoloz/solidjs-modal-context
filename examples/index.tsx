import { render } from "solid-js/web";
import { createMemo, For, JSX } from "solid-js";
import { A, Route, Router, Routes, useLocation } from "@solidjs/router";
import { ModalProvider } from "@lib";
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
  defaultCancelable?: boolean,
}

const ROUTES: readonly TestRouteDef[] = [
  { name: "Simple Example", route: "/", component: SimpleExample },
  { name: "Output Example", route: "/output", component: OutputExample, defaultCancelable: false }
] as const;

const App = () => {
  const location = useLocation();
  const cancelable = createMemo(() => {
    const path = location.pathname;
    const routeDef = ROUTES.find(it => path === it.route);
    return routeDef?.defaultCancelable;
  });

  return (
    <ModalProvider defaultCancelable={cancelable()}>
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
  );
};

render(() => (
  <Router>
    <App />
  </Router>
), root);
