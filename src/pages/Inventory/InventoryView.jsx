import ItemRow from "./ItemRow";
import "./InventoryView.css";

function InventoryView() {
  return (
    <div className="inventory-view">
      <ItemRow />
      <ItemRow />
      <ItemRow />
    </div>
  );
}

export default InventoryView;
