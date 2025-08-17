import ky from "ky";
import { useAuthStore } from "../stores/useAuthStore";
import { baseUrl as BASE_URL } from "./constants";

// ---- Refresh token (no version) ----
async function refreshAccessToken() {
  try {
    const res = await ky
      .post(`${BASE_URL}/refresh`, { credentials: "include" })
      .json();

    const { user, accessToken } = res;
    useAuthStore.getState().login({ user, accessToken });
    return true;
  } catch (err) {
    console.error("Refresh failed:", err);
    return false;
  }
}

/**
 * Create a ky client **for a specific API version**.
 * Example: const apiV1 = getKyClient("v1"); const apiV2 = getKyClient("v2");
 * Then: apiV1.post("login"), apiV2.get("users")
 */
export function getKyClient(version = "v1") {
  const prefix = `${BASE_URL}/${version}`;
  let token = useAuthStore.getState().accessToken;

  const client = ky.create({
    prefixUrl: prefix,
    credentials: "include",
    hooks: {
      beforeRequest: [
        (request) => {
          token = useAuthStore.getState().accessToken;
          if (token) request.headers.set("Authorization", `Bearer ${token}`);
        },
      ],
      afterResponse: [
        async (request, options, response) => {
          if (response.status !== 401) return response;

          const url = request.url || "";
          // Skip refresh loop on auth endpoints
          if (
            url.includes("/login") ||
            url.includes("/register") ||
            url.includes("/refresh") ||
            url.includes("/logout")
          ) {
            return response;
          }

          const refreshed = await refreshAccessToken();
          if (!refreshed) {
            useAuthStore.getState().logout();
            return response; // bubble the 401
          }

          // Retry the original request on the SAME versioned client
          // Rebuild from the Request object to preserve method/body/headers
          const retryHeaders = new Headers(request.headers);
          // refresh might have updated the token
          const newToken = useAuthStore.getState().accessToken;
          if (newToken) retryHeaders.set("Authorization", `Bearer ${newToken}`);

          return client(request.url.replace(prefix + "/", ""), {
            ...options,
            headers: retryHeaders,
          });
        },
      ],
    },
  });

  return client;
}

// (Optional) convenience exports if you mostly use v1 right now:
export const apiV1 = getKyClient("v1");
export const apiV2 = getKyClient("v2");
