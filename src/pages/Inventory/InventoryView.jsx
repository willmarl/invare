import ItemRow from "./ItemRow";
import ItemCard from "./ItemCard";
import "./InventoryView.css";

function InventoryView({ viewMode }) {
  if (viewMode === "grid") {
    return (
      <div className="inventory-view inventory-view_grid">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    );
  }
  return (
    <div className="inventory-view">
      <ItemRow />
      <ItemRow />
      <ItemRow />
      <ItemRow />
    </div>
  );
}

export default InventoryView;
