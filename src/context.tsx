import { createContext, createSignal, Show, useContext } from "solid-js";
import { ModalComponent, ModalData } from "./types";
import { MaybeFlowProps, ModalState } from "./common";
import { ModalRenderer } from "./components";

type ModalContextType = {
  openModal(component: ModalComponent<unknown>, data: ModalData<unknown>): void;
  closeModal(): void;
}

const ModalContext = createContext<ModalContextType>({
  openModal(_component: ModalComponent<unknown>, _data: ModalData<unknown>) {
  },
  closeModal() {
  }
});

export type ModalProviderProps = MaybeFlowProps;

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
  const [modal, setModal] = createSignal<ModalState<unknown> | null>(null);

  const modalControls: ModalContextType = {
    openModal(component: ModalComponent<unknown>, data: ModalData<unknown>) {
      setModal({ component, data });
    },
    closeModal() {
      setModal(null);
    }
  };

  return (
    <ModalContext.Provider value={modalControls}>
      <Show when={modal() != null}>
        <ModalRenderer state={modal()!} close={modalControls.closeModal} />
      </Show>
      {props.children}
    </ModalContext.Provider>
  );
};

/**
 * Type of modal opener function returned by {@link useModalOpener} and {@link useModalControls}.
 */
export type ModalOpener = {
  (component: ModalComponent): void;
  <I = undefined>(component: ModalComponent<I>, data: ModalData<I>): void;
};

/**
 * Type of modal closer returned by {@link useModalCloser} and {@link useModalControls}.
 */
export type ModalCloser = () => void;

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
  return createModalOpenerFromContext(context);
}

/**
 * Use modal closer function
 *
 * @example
 * Close a modal
 * ```
 * const closeModal = useModalCloser();
 * const handleClick = () => {
 *   closeModal();
 * };
 * ```
 */
export function useModalCloser(): ModalCloser {
  const context = useContext(ModalContext);
  return context.closeModal;
}

/**
 * Use modal controls
 *
 * @example
 * Open and close modal from two different functions within the same component
 * ```
 * const [openModal, closeModal] = useModalControls();
 * const handleOpenButtonClick = () => {
 *   openModal(MyModal);
 * };
 * const handleCloseButtonClick = () => {
 *   closeModal();
 * };
 * ```
 */
export function useModalControls(): [ModalOpener, ModalCloser] {
  const context = useContext(ModalContext);
  return [createModalOpenerFromContext(context), context.closeModal];
}

function createModalOpenerFromContext(context: ModalContextType): ModalOpener {
  return ((component, data) => context.openModal(
      component as ModalComponent<unknown>,
      data as ModalData<unknown>)
  ) as ModalOpener;
}
