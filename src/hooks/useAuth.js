import { useMutation } from "@tanstack/react-query";
import { getKyClient } from "../utils/kyClient";
import { useAuthStore } from "../stores/useAuthStore";

export function useLogout(options = {}) {
  const logoutStore = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: async () => {
      await getKyClient().post("logout");
    },
    onSuccess: () => {
      logoutStore();
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      options?.onError?.(error);
    },
  });
}
