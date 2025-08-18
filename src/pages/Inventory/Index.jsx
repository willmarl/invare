import { useState, useMemo, useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import "./Inventory.css";
import Toolbar from "./Toolbar";
import Guest from "./Guest";
import InventoryView from "./InventoryView";
import { useInventoriesByUser } from "../../hooks/useInventories";
import { useQuery } from "@tanstack/react-query";
import { getModuleById } from "../../api/modules";

function Inventory() {
  const { isAuthenticated: isLoggedIn, user } = useAuthStore();
  // Persist viewMode in localStorage
  const VIEW_MODE_KEY = "inventoryViewMode";
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem(VIEW_MODE_KEY) || "row";
  });
  // Save viewMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);
  const [filter, setFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch inventories for the logged-in user
  const userId = user?.id;
  const { data: inventories = [], isLoading: invLoading } =
    useInventoriesByUser(userId);

  // Fetch all modules in inventory by their IDs (regardless of owner)
  const moduleIds = inventories.map((inv) => inv.moduleId).filter(Boolean);
  const { data: modulesData = [], isLoading: modulesLoading } = useQuery({
    queryKey: ["modulesByIds", moduleIds],
    queryFn: async () => {
      // Fetch all modules in parallel
      const results = await Promise.all(
        moduleIds.map((id) => getModuleById(id).catch(() => null))
      );
      return results.filter(Boolean);
    },
    enabled: moduleIds.length > 0,
  });

  // Merge inventory and module data
  const prepedData = useMemo(() => {
    if (!inventories.length || !modulesData.length) return [];
    return inventories
      .map((invItem) => {
        const module = modulesData.find((mod) => mod._id === invItem.moduleId);
        return module
          ? { ...module, quantity: invItem.quantity, invId: invItem._id }
          : null;
      })
      .filter(Boolean);
  }, [inventories, modulesData]);

  // Get all categories for filter
  const allCategories = useMemo(() => {
    const cats = new Set();
    modulesData.forEach((mod) => {
      if (Array.isArray(mod.category)) {
        mod.category.forEach((cat) => cats.add(cat));
      }
    });
    return Array.from(cats);
  }, [modulesData]);

  const handleCategoryToggle = (category) => {
    if (category === "all") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="inventory">
        <Guest />
      </div>
    );
  }

  if (invLoading || modulesLoading) {
    return <div className="inventory">Loading...</div>;
  }

  return (
    <div className="inventory">
      <Toolbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        filter={filter}
        setFilter={setFilter}
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <InventoryView
        viewMode={viewMode}
        data={prepedData}
        filter={filter}
        selectedCategories={selectedCategories}
        sortField={sortField}
        sortDirection={sortDirection}
      />
    </div>
  );
}

export default Inventory;
