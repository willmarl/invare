import { useEffect } from "react";
import ky from "ky";
import { useAuthStore } from "../stores/useAuthStore";
import { baseUrl } from "../utils/constants";

export function useHydrateAuth() {
  const login = useAuthStore((s) => s.login);
  const setHydrated = useAuthStore((s) => s.setHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    // ✅ If already logged in, skip API call but still mark as hydrated
    if (isAuthenticated) {
      setHydrated();
      return;
    }

    async function hydrate() {
      try {
        const res = await ky
          .post(`${baseUrl}/refresh`, {
            credentials: "include",
          })
          .json();

        // ✅ Session found → log in & mark hydrated
        login(res);
      } catch (err) {
        // ✅ If no refresh cookie (normal on first load), silently hydrate
        if (err.response?.status === 401) {
          setHydrated(); // just means "no valid session"
        } else {
          // ✅ Unexpected error (network, server down, etc.)
          console.error("Hydrate failed unexpectedly:", err);
          setHydrated();
        }
      }
    }

    hydrate();
  }, [isAuthenticated, login, setHydrated]);
}
