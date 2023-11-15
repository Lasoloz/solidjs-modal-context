import { createContext, createSignal, Show, useContext } from "solid-js";
import { ModalComponent, ModalData, ModalOpener, ModalProviderProps } from "./types";
import { ModalRenderer, ModalState } from "./common";

const DEFAULT_CANCELABLE = true;

type ModalContextType = {
  openModal(component: ModalComponent<unknown, unknown>, data: ModalData<unknown, unknown>): void;
  closeModal(): void;
}

const ModalContext = createContext<ModalContextType>({
  openModal(_component: ModalComponent<unknown, unknown>, _data: ModalData<unknown, unknown>) {
  },
  closeModal() {
  }
});

/**
 * Provider for modal context and modal rendering
 *
 * @example
 * Using the provider within a Solid JS app
 * ```
 * const App = () => (
 *   <ModalProvider>
 *     <MyButtonOpeningModal />
 *   </ModalProvider>
 * )
 * ```
 */
export const ModalProvider = (props: ModalProviderProps) => {
  const [modal, setModal] = createSignal<ModalState<unknown, unknown> | null>(null);

  const modalControls: ModalContextType = {
    openModal(component: ModalComponent<unknown, unknown>, data: ModalData<unknown, unknown>) {
      setModal({ component, data });
    },
    closeModal() {
      setModal(null);
    }
  };

  return (
    <ModalContext.Provider value={modalControls}>
      <Show when={modal() != null}>
        <ModalRenderer
          state={modal()!}
          onClose={modalControls.closeModal}
          fallbackCancelable={props.defaultCancelable ?? DEFAULT_CANCELABLE}
        />
      </Show>
      {props.children}
    </ModalContext.Provider>
  );
};

/**
 * Use modal opener function
 *
 * @example
 * Open a modal
 * ```
 * const openModal = useModalOpener();
 * const handleClick = () => {
 *   openModal(MyModal);
 * };
 * ```
 */
export function useModalOpener(): ModalOpener {
  const context = useContext(ModalContext);
  return ((component, data) => context.openModal(
      component as ModalComponent<unknown, unknown>,
      (data ?? {}) as ModalData<unknown, unknown>)
  ) as ModalOpener;
}

