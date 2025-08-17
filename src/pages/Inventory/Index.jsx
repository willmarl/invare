import { useState, useMemo } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import "./Inventory.css";
import Toolbar from "./Toolbar";
import Guest from "./Guest";
import InventoryView from "./InventoryView";
import { useInventoriesByUser } from "../../hooks/useInventories";
import { useModules } from "../../hooks/useModules";

function Inventory() {
  const { isAuthenticated: isLoggedIn, user } = useAuthStore();
  const [viewMode, setViewMode] = useState("row");
  const [filter, setFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch inventories for the logged-in user
  const userId = user?._id;
  const { data: inventories = [], isLoading: invLoading } =
    useInventoriesByUser(userId);
  // Fetch all modules (could be optimized to fetch only needed modules if API supports)
  const { data: modules = [], isLoading: modulesLoading } = useModules();

  // Merge inventory and module data
  const prepedData = useMemo(() => {
    if (!inventories.length || !modules.length) return [];
    return inventories
      .map((invItem) => {
        const module = modules.find((mod) => mod._id === invItem.moduleId);
        return module
          ? { ...module, quantity: invItem.quantity, invId: invItem._id }
          : null;
      })
      .filter(Boolean);
  }, [inventories, modules]);

  // Get all categories for filter
  const allCategories = useMemo(() => {
    const cats = new Set();
    modules.forEach((mod) => {
      if (Array.isArray(mod.category)) {
        mod.category.forEach((cat) => cats.add(cat));
      }
    });
    return Array.from(cats);
  }, [modules]);

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
