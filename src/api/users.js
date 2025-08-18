import { apiV1 } from "../utils/kyClient";

// Get current user profile
export function getCurrentUser() {
  return apiV1.get("users/me").json();
}

// Update current user profile
export function updateCurrentUser(data) {
  return apiV1.put("users/me", { json: data }).json();
}

// Delete current user (account deletion)
export function deleteCurrentUser() {
  return apiV1.delete("users/me").json();
}
