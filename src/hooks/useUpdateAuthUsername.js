// Utility to update username in useAuthStore after profile update
import { useAuthStore } from "../stores/useAuthStore";

export function useUpdateAuthUsername() {
  return (username) => {
    useAuthStore.getState().updateUsername(username);
  };
}
