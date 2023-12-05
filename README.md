# solidjs-modal-context

A context-based utility for managing complex modals in SolidJS.

This library lets you create type-safe modals, which can be easily opened within the modal context.
It also enables data flow between modals and parent component, thus allowing you to read user input without
a global application state.

It is advised to use TypeScript for fully utilizing the library's capabilities.

This utility comes with minimal styling, you are free to create your own modals and/or use a UI-library with modal
components.

## Table of Contents

TBD

## Getting started

```shell
> npm i solidjs-modal-context
```

Install `solidjs-modal-context`, then add the provider to the root level of your app:

```jsx
import { render } from "solid-js/web";
import { ModalProvider } from "solidjs-modal-context";
import App from "./App";

render(() => (
  // Other providers/routers here
  <ModalProvider>
    <App />
  </ModalProvider>
), root);
```

This creates a context for modal management and also sets up the rendering entry point in your application.

_Note_: Currently it is not possible to use a ModalRenderer at a different place
(the context and renderer are coupled). There is a plan to fix this in the future.

The provider also accepts customizations for modal behavior and backdrop styling:

```jsx
<ModalProvider
  defaultCancelable={false}
  backdropClass="fixed left-0 top-0 flex h-full w-full grid-cols-1 grid-rows-1
   items-center justify-center bg-gray-500/50 p-4 backdrop-blur-sm"
  backdropStyle="z-index: 50;"
>
  <App />
</ModalProvider>;
```

## Creating modals

Creating simple modals can be done with or without using props:

```jsx
const MySimpleModal = () => (
  <div>
    <p>This is a very simple modal</p>
  </div>
);

export default MySimpleModal;
```

If you are using TypeScript, then you must provide the `ModalProps` type for the props parameter.

```tsx
import { ModalProps } from "solidjs-modal-context";

const MySimpleModal = (props: ModalProps) => (
  <div>
    <p>This is another very simple modal</p>
  </div>
);

export default AnotherSimpleModal;
```

Modals can also accept an input and output type:

```tsx
import { ModalProps } from "solidjs-modal-context";
import { UserDetails } from "./user";

const UserRegistrationModal = (props: ModalProps<boolean, UserDetails>) => {
  const requireCaptcha = props.input;
  const [data, setData] = createSignal<UserDetails>({ username: "", password: "" });

  const handleSubmitButton = () => {
    props.close(data());
  };

  return /* modal */;
};

export default UserRegistrationModal;
```

## Opening modals

To open a modal, first include the modal opener function, then use the modal component as it's parameter:

```jsx
import { useModalOpener } from "solidjs-modal-context";
import MySimpleModal from "./MySimpleModal";

const MySimplePage = () => {
  const openModal = useModalOpener();

  const alertUser = () => {
    openModal(MySimpleModal);
  };

  return /* component */;
}

export default MySimplePage;
```

The opener function also accepts a modal data object. When your modal accepts input, you *have* to provide the input
in this object. You can also specify close event and cancellation event handlers. The close event handler resolves with
0 parameters if your modal has no output, and resolves with the output provided in the `props.close()` call otherwise.

```tsx
import { useModalOpener } from "solidjs-modal-context";
import UserRegistrationModal from "./UserRegistrationModal";

const RegistrationPage = () => {
  const openModal = useModalOpener();

  const handleRegistrationButton = () => {
    openModal(UserRegistrationModal, {
      input: true, // Required based on UserRegistrationModal's signature
      onClose: (userDetails /* has correct type based on modal signature */) => {
        // Send registration request
      },

      // Optional cancel handler (makes the modal cancellable by clicking outside the box):
      onCancel: () => {
        console.log("Registration cancelled!");
      }
    });
  };
};

export default RegistrationPage;
```

## Output forwarding

TBD
