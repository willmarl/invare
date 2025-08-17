import { apiV1 } from "../utils/kyClient";

// Create a new module
export const createModule = async (data) => {
  return apiV1.post("modules", { json: data }).json();
};

// Get all modules
export const getModules = async () => {
  return apiV1.get("modules").json();
};

// Get module by ID
export const getModuleById = async (moduleId) => {
  return apiV1.get(`modules/${moduleId}`).json();
};

// Get module by slug
export const getModuleBySlug = async (slug) => {
  return apiV1.get(`modules/slug/${slug}`).json();
};

// Get modules by owner (userId)
export const getModulesByOwner = async (userId) => {
  return apiV1.get(`modules/by/${userId}`).json();
};

// Update module
export const updateModule = async ({ moduleId, data }) => {
  return apiV1.patch(`modules/${moduleId}`, { json: data }).json();
};

// Delete module
export const deleteModule = async (moduleId) => {
  return apiV1.delete(`modules/${moduleId}`).json();
};

// Get wiki by username and slug
export const getWikiByUsernameSlug = async ({ username, slug }) => {
  return apiV1.get(`modules/wiki/${username}/${slug}`).json();
};

// Update wiki by username and slug
export const updateWikiByUsernameSlug = async ({ username, slug, data }) => {
  return apiV1.patch(`modules/wiki/${username}/${slug}`, { json: data }).json();
};

// Delete wiki by username and slug
export const deleteWikiByUsernameSlug = async ({ username, slug }) => {
  return apiV1.delete(`modules/wiki/${username}/${slug}`).json();
};
