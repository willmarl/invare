import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isHydrated: false,
  isLoading: false,

  login: ({ user, accessToken }) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
      isHydrated: true,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isHydrated: true,
    }),

  setHydrated: () => set({ isHydrated: true }),
  setLoading: (loading) => set({ isLoading: loading }),

  updateUsername: (username) =>
    set((state) => ({
      user: state.user ? { ...state.user, username } : null,
    })),
}));

console.log(
  "debug:",
  useAuthStore.getState().user,
  useAuthStore.getState().accessToken
);
