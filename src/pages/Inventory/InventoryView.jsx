import ItemRow from "./ItemRow";
import ItemCard from "./ItemCard";
import "./InventoryView.css";

// This can be optimized with memoization
function InventoryView({
  viewMode,
  data,
  filter,
  selectedCategories = [],
  sortField = "name",
  sortDirection = "asc",
}) {
  let filteredData = data;

  if (filter) {
    filteredData = filteredData.filter(
      (item) =>
        (item.name?.toLowerCase() || "").includes(filter.toLowerCase()) ||
        (item.model?.toLowerCase() || "").includes(filter.toLowerCase()) ||
        (item.description?.toLowerCase() || "").includes(filter.toLowerCase())
    );
  }

  if (selectedCategories.length > 0) {
    filteredData = filteredData.filter((item) =>
      selectedCategories.every((cat) => item.category?.includes(cat))
    );
  }

  // Sort logic
  filteredData = [...filteredData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (sortField === "quantity") {
      aValue = Number(aValue) || 0;
      bValue = Number(bValue) || 0;
    } else {
      aValue = (aValue || "").toString().toLowerCase();
      bValue = (bValue || "").toString().toLowerCase();
    }
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  if (filteredData.length === 0) {
    return (
      <div className="inventory-view__empty">
        <p>
          {data.length === 0
            ? "Your inventory is empty. Add some modules to get started!"
            : "No results found. Try adjusting your search or filters."}
        </p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="inventory-view inventory-view_grid">
        {filteredData.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    );
  }
  return (
    <div className="inventory-view">
      {filteredData.map((item) => (
        <ItemRow key={item._id} item={item} />
      ))}
    </div>
  );
}

export default InventoryView;
