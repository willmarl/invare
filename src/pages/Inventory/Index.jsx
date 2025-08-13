import "./Inventory.css";
import Toolbar from "./Toolbar";
import InventoryView from "./InventoryView";

function Inventory() {
  return (
    <div className="inventory">
      <Toolbar />
      <InventoryView />
    </div>
  );
}

export default Inventory;
