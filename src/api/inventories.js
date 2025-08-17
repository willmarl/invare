import { apiV1 } from "../utils/kyClient";

// Create inventory
export const createInventory = async (data) => {
  return apiV1.post("inventories", { json: data }).json();
};

// Get inventory by ID
export const getInventoryById = async (invId) => {
  return apiV1.get(`inventories/${invId}`).json();
};

// Get inventories by user ID
export const getInventoriesByUser = async (userId) => {
  return apiV1.get(`inventories/by/${userId}`).json();
};

// Update inventory
export const updateInventory = async ({ invId, data }) => {
  return apiV1.patch(`inventories/${invId}`, { json: data }).json();
};

// Delete inventory
export const deleteInventory = async (invId) => {
  return apiV1.delete(`inventories/${invId}`).json();
};
