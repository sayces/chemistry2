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
  setHoveredItemId: (id: NavItemId | null) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  hoveredItemId: null,
  setHoveredItemId: (id) => set({ hoveredItemId: id }),
}));
