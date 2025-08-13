import ItemRow from "./ItemRow";
import ItemCard from "./ItemCard";
import "./InventoryView.css";

function InventoryView() {
  return (
    <div className="inventory-view">
      {/* <ItemRow /> */}
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
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

export default InventoryView;
