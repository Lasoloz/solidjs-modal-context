# solidjs-modal-context

A context-based utility for managing complex modals in SolidJS.

This library lets you create type-safe modals, which can be easily opened within the modal context.
It also enables data flow between modals and parent components, thus allowing you to read user input without
a global application state.

It is advised to use TypeScript to utilize the library's capabilities fully.

This utility comes with minimal styling; you are free to create your modals and/or use a UI library with modal
components.

## Table of Contents

1. [Getting started](#getting-started)
2. [Creating modals](#creating-modals)
3. [Opening modals](#opening-modals)
4. [Output forwarding](#output-forwarding)
5. [Components](#components)
    - [ModalProvider](#modalprovider)
6. [Hooks](#hooks)
    - [useModalOpener](#usemodalopener)
7. [Caveats](#caveats)
8. [Future of this library](#future-of-this-library)

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

_Note_: Currently, it is not possible to use a ModalRenderer at a different place
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

If you use TypeScript, you must provide the `ModalProps` type for the props parameter.

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

To open a modal, first include the modal opener function, then use the modal component as its parameter:

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
0 parameters if your modal has no output and resolves with the output provided in the `props.close()` call otherwise.

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

Right now, the library is quite restrictive. This allows you always to get what you expect.
For example, if a modal has a given output type, new modals opened from that modal must
also have the same output type.

_Note_: this functionality probably will be extended with support for output transformations,
so modals can open other modals with a different output type given a correct transformation
is provided.

The following example demonstrates such a use case:

```tsx
import { ModalProps } from "solidjs-modal-context";

const UserRegistrationModal = (props: ModalProps<undefined, UserDetails>) => {
  // implementation
};

const YesNoModal = (props: ModalProps<undefined, boolean>) => {
  // implementation
};

const UserLoginModal = (props: ModalProps<undefined, UserDetails>) => {
  const handleRegistrationClick = () => {
    props.openForwarding(UserRegistrationModal);
  };

  const handleClick = () => {
    props.openForwarding(YesNoModal);
    //                   ^ type error here
  };

  return (
    <button onClick={handleRegistrationClick}>I don't have an account</button>
  );
};
```

The `openForwarding` function also forces you to provide an input if the modal requires one:

```tsx
props.openForwarding(UserRegistrationModal, { input: { requireCaptcha: true } });
```

## Components

### `ModalProvider`

Provides the context for state management. It also represents the point where the modals will be rendered.

Properties:

| Prop              | Type    | Description                                        | Optional | Defaults to |
|-------------------|---------|----------------------------------------------------|----------|-------------|
| defaultCancelable | boolean | Defines default behavior when clicking on backdrop | yes      | true        |
| backdropClass     | string  | Class attribute for modal backdrop DIV             | yes      | undefined   |
| backdropStyle     | string  | Style attribute for modal backdrop DIV             | yes      | undefined   |

## Hooks

### `useModalOpener`

Returns a function for opening modals (aka updating the context state)

Has two forms:

1. Opening without modal data: `<O = undefined>(component: ModalComponent<undefined, O>): void;`
   Cannot be used if the modal requires an input
2. Opening with modal
   data: `<I = undefined, O = undefined>(component: ModalComponent<I, O>, data: ModalData<I, O>): void;`
   It must be used if the modal requires an input. It can also be used to provide additional
   options, like `onClose` and `onCancel` handlers.

The `ModalData` object has the following fields:

| Field      | Type                                                  | Description                                                                         |
|------------|-------------------------------------------------------|-------------------------------------------------------------------------------------|
| input      | `T \| undefined` (Generic)                            | Only exists if the modal requires an input. Has the same type as the modal input    |
| onClose    | `() => void \| (data: T) => void` (Generic parameter) | Optional field. Has one parameter if the modal specifies an output; otherwise, none |
| onCancel   | `() => void`                                          | Optional field. If provided, it makes the modal cancelable                          |
| cancelable | `boolean`                                             | Optional field. If provided, it can override the default backdrop click behavior    |

## Caveats

- If a modal is reopened with `openForwarding`, its state will not reset properly, as SolidJS does
  not unnecessarily recreate components. (See `output-forwarding.tsx` in the examples)

## Future of this library

The following features are planned or are in work in progress state:

- Separate renderer from provider
- Modal stacking (bad UI practice, but might be needed sometimes)
- Value forwarding with output transformation
