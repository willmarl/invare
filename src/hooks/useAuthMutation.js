import { useMutation } from "@tanstack/react-query";
import { getKyClient } from "../utils/kyClient";
import { useAuthStore } from "../stores/useAuthStore";

export function useAuthMutation(type, opts = {}) {
  const loginStore = useAuthStore((s) => s.login);

  if (!["login", "register"].includes(type)) {
    throw new Error(`useAuthMutation: invalid type "${type}"`);
  }

  return useMutation({
    mutationFn: async (credentials) => {
      return await getKyClient().post(type, { json: credentials }).json();
    },

    onSuccess: (data) => {
      // ✅ Auto-login if backend returned accessToken
      if (data.accessToken && data.user) {
        loginStore({ user: data.user, accessToken: data.accessToken });
      }

      // ✅ Allow component-specific success callback
      opts?.onSuccess?.(data);
    },

    onError: async (error) => {
      let message = `${type === "login" ? "Login" : "Registration"} failed`;

      if (error.response) {
        const errJson = await error.response.json();
        message = errJson.message || errJson.error || message;
      } else {
        message = "Network error, please try again";
      }

      // ✅ Pass parsed message to component
      opts?.onError?.(message);
    },
  });
}
