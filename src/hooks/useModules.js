import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createModule,
  getModules,
  getModuleById,
  getModuleBySlug,
  getModulesByOwner,
  updateModule,
  deleteModule,
  getWikiByUsernameSlug,
  updateWikiByUsernameSlug,
  deleteWikiByUsernameSlug,
} from "../api/modules";

// Fetch all modules
export function useModules() {
  return useQuery({
    queryKey: ["modules"],
    queryFn: getModules,
  });
}

// Fetch module by ID
export function useModule(moduleId) {
  return useQuery({
    queryKey: ["module", moduleId],
    queryFn: () => getModuleById(moduleId),
    enabled: !!moduleId,
  });
}

// Fetch module by slug
export function useModuleBySlug(slug) {
  return useQuery({
    queryKey: ["moduleSlug", slug],
    queryFn: () => getModuleBySlug(slug),
    enabled: !!slug,
  });
}

// Fetch modules by owner
export function useModulesByOwner(userId) {
  return useQuery({
    queryKey: ["modulesByOwner", userId],
    queryFn: () => getModulesByOwner(userId),
    enabled: !!userId,
  });
}

// Create module mutation
export function useCreateModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createModule,
    onSuccess: () => {
      queryClient.invalidateQueries(["modules"]);
    },
  });
}

// Update module mutation
export function useUpdateModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateModule,
    onSuccess: (_, { moduleId }) => {
      queryClient.invalidateQueries(["modules"]);
      queryClient.invalidateQueries(["module", moduleId]);
    },
  });
}

// Delete module mutation
export function useDeleteModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteModule,
    onSuccess: () => {
      queryClient.invalidateQueries(["modules"]);
    },
  });
}

// Wiki hooks
export function useWikiByUsernameSlug(username, slug) {
  return useQuery({
    queryKey: ["wiki", username, slug],
    queryFn: () => getWikiByUsernameSlug({ username, slug }),
    enabled: !!username && !!slug,
  });
}

export function useUpdateWikiByUsernameSlug() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWikiByUsernameSlug,
    onSuccess: (_, { username, slug }) => {
      queryClient.invalidateQueries(["wiki", username, slug]);
    },
  });
}

export function useDeleteWikiByUsernameSlug() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWikiByUsernameSlug,
    onSuccess: (_, { username, slug }) => {
      queryClient.invalidateQueries(["wiki", username, slug]);
    },
  });
}
