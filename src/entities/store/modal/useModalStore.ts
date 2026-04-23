import { create, StateCreator } from "zustand";
import { ModalState, ModalStore } from "./types";



const initialState: ModalState = {
  isOpen: false,
  type: null,
};

const modalStore: StateCreator<ModalStore> = (set, get) => ({
  ...initialState,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
});

export const useModalStore = create<ModalStore>()(modalStore);

// Selectors
export const isOpen = () => useModalStore((state) => state.isOpen);

// Action selector
export const openModalAction = () => useModalStore.getState().openModal;
export const closeModalAction = () => useModalStore.getState().closeModal;

