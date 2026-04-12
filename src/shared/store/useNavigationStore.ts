import { create } from "zustand";

export type NavItemId = "calendar" | "map" | "gallery" | "profile";

export interface NavItemConfig {
  id: NavItemId;
  href: string;
  hoverColor: string;
}

export const navItems: NavItemConfig[] = [
  { id: "calendar", href: "/calendar", hoverColor: "calendarBg" },
  { id: "map", href: "/map", hoverColor: "mapBg" },
  { id: "gallery", href: "/gallery", hoverColor: "galleryBg" },
  { id: "profile", href: "/profile", hoverColor: "profileBg" },
];

interface NavigationState {
  hoveredItemId: NavItemId | null;
  previousActiveItemId: NavItemId | null;
  currentActiveItemId: NavItemId | null;
  setHoveredItemId: (id: NavItemId | null) => void;
  setCurrentActiveItemId: (id: NavItemId | null) => void;
  setPreviousActiveItemId: (id: NavItemId | null) => void;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  hoveredItemId: null,
  previousActiveItemId: null,
  currentActiveItemId: null,
  setHoveredItemId: (id) => set({ hoveredItemId: id }),
  setCurrentActiveItemId: (id) => {
    const { currentActiveItemId: prevId } = get();
    if (prevId && prevId !== id) {
      set({ previousActiveItemId: prevId });
    }
    set({ currentActiveItemId: id });
  },
  setPreviousActiveItemId: (id) => set({ previousActiveItemId: id }),
}));
