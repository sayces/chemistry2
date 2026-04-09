import { create } from "zustand";

interface NavigationState {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activePage: "/", // default active page is Home ("/")
  setActivePage: (page) => set({ activePage: page }),
}));
