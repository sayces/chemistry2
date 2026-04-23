// Modals
type ModalType = "timeMenu" | "serviceMenu" | "confirm" | null;

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
}

export interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

export interface ModalStore extends ModalState, ModalActions {}
