import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
} from "../api/users";

// Fetch current user profile
export function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    ...options,
  });
}

// Update current user profile
export function useUpdateCurrentUser(options = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["currentUser"]);
      options.onSuccess?.(...args);
    },
    ...options,
  });
}

// Delete current user (account deletion)
export function useDeleteCurrentUser(options = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCurrentUser,
    onSuccess: (...args) => {
      queryClient.removeQueries(["currentUser"]);
      options.onSuccess?.(...args);
    },
    ...options,
  });
}
