import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createInventory,
  getInventoryById,
  getInventoriesByUser,
  updateInventory,
  deleteInventory,
} from "../api/inventories";

// Fetch inventory by ID
export function useInventory(invId) {
  return useQuery({
    queryKey: ["inventory", invId],
    queryFn: () => getInventoryById(invId),
    enabled: !!invId,
  });
}

// Fetch inventories by user ID
export function useInventoriesByUser(userId) {
  return useQuery({
    queryKey: ["inventoriesByUser", userId],
    queryFn: () => getInventoriesByUser(userId),
    enabled: !!userId,
  });
}

// Create inventory mutation
export function useCreateInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventoriesByUser"] });
    },
  });
}

// Update inventory mutation
export function useUpdateInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInventory,
    onSuccess: (_, { invId, userId }) => {
      queryClient.invalidateQueries(["inventory", invId]);
      if (userId) queryClient.invalidateQueries(["inventoriesByUser", userId]);
    },
  });
}

// Delete inventory mutation
export function useDeleteInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInventory,
    onSuccess: (_, { invId, userId }) => {
      queryClient.invalidateQueries(["inventory", invId]);
      if (userId) queryClient.invalidateQueries(["inventoriesByUser", userId]);
    },
  });
}
