import { useState } from "react";
import "./Inventory.css";
import Toolbar from "./Toolbar";
import InventoryView from "./InventoryView";

function Inventory() {
  const [viewMode, setViewMode] = useState("row");

  return (
    <div className="inventory">
      <Toolbar viewMode={viewMode} setViewMode={setViewMode} />
      <InventoryView viewMode={viewMode} />
    </div>
  );
}

export default Inventory;
