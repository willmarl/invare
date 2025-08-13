import { Funnel, Plus, Rows3, Grid3X3 } from "lucide-react";
import "./Toolbar.css";

const categories = [
  "All",
  "Input",
  "Output",
  "Sensor",
  "Power",
  "Driver",
  "Display",
  "Boards",
  "Wireless",
  "Capacitor",
];

function Toolbar() {
  return (
    <div className="toolbar">
      {/* Top row */}
      <div
        className="toolbar__top"
        role="toolbar"
        aria-label="Inventory toolbar"
      >
        <button className="btn btn--pill toolbar__assistant">Assistant</button>

        <input
          placeholder="Search"
          type="text"
          className="input input--search"
          aria-label="Search"
        />

        <button className="btn btn--icon" aria-label="Filter">
          <Funnel className="icon" />
        </button>

        <button className="btn btn--pill toolbar__add" aria-label="Add item">
          <Plus className="icon icon--sm" />
          <span className="btn__label">Add Module</span>
        </button>

        <div className="toolbar__view" aria-label="View toggles">
          <button className="btn btn--icon" aria-label="Grid view">
            <Grid3X3 className="icon" />
          </button>
          <button className="btn btn--icon" aria-label="List view">
            <Rows3 className="icon" />
          </button>
        </div>
      </div>

      {/* Category chips */}
      <div className="toolbar__chips" aria-label="Categories">
        {categories.map((c) => (
          <button key={c} className="chip">
            {c}
          </button>
        ))}
      </div>

      {/* Stats footer */}
      <div className="toolbar__stats" aria-live="polite">
        <span>Total Components: 7</span>
        <span>Categories: 9</span>
        <span>Low Stock: 3</span>
      </div>
    </div>
  );
}

export default Toolbar;
