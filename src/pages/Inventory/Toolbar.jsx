import { useState, useRef, useEffect } from "react";
import {
  Funnel,
  Plus,
  Rows3,
  Grid3X3,
  ChevronDown,
  List,
  User,
  Sparkle,
} from "lucide-react";
import "./Toolbar.css";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { useModalStore } from "../../stores/useModalStore";

function Toolbar({
  viewMode,
  setViewMode,
  filter,
  setFilter,
  allCategories,
  selectedCategories = [],
  onCategoryToggle = () => {},
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}) {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const addDropdownRef = useRef(null);
  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        addDropdownRef.current &&
        !addDropdownRef.current.contains(e.target)
      ) {
        setShowAddDropdown(false);
      }
    }
    if (showAddDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddDropdown]);
  const openModal = useModalStore((s) => s.openModal);

  const handleSortChange = (field) => {
    setSortField(field);
    setShowSortMenu(false);
  };

  const handleDirectionChange = (dir) => {
    setSortDirection(dir);
    setShowSortMenu(false);
  };

  return (
    <div className="toolbar">
      {/* Top row */}
      <div
        className="toolbar__top"
        role="toolbar"
        aria-label="Inventory toolbar"
        style={{ position: "relative" }}
      >
        <button
          className="btn btn--pill toolbar__assistant"
          type="button"
          style={{ background: "#2563eb", color: "#fff" }}
          onClick={() => openModal("AssistantModal")}
        >
          Assistant
        </button>

        <input
          placeholder="Search"
          type="text"
          className="input input--search"
          aria-label="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {/* Filter button and sort menu wrapper */}
        <span style={{ position: "relative", display: "inline-block" }}>
          <button
            className="btn btn--icon"
            aria-label="Filter"
            onClick={() => setShowSortMenu((v) => !v)}
          >
            <Funnel className="icon" />
          </button>
          {showSortMenu && (
            <div className="toolbar__sort-menu">
              <div>
                <span>Sort by:</span>
                <button
                  className={`toolbar__sort-option${
                    sortField === "name" ? " toolbar__sort-option--active" : ""
                  }`}
                  onClick={() => handleSortChange("name")}
                  type="button"
                >
                  Name
                </button>
                <button
                  className={`toolbar__sort-option${
                    sortField === "quantity"
                      ? " toolbar__sort-option--active"
                      : ""
                  }`}
                  onClick={() => handleSortChange("quantity")}
                  type="button"
                >
                  Quantity
                </button>
                <button
                  className={`toolbar__sort-option${
                    sortField === "model" ? " toolbar__sort-option--active" : ""
                  }`}
                  onClick={() => handleSortChange("model")}
                  type="button"
                >
                  Model
                </button>
              </div>
              <div>
                <span>Direction:</span>
                <button
                  className={`toolbar__sort-option${
                    sortDirection === "asc"
                      ? " toolbar__sort-option--active"
                      : ""
                  }`}
                  onClick={() => handleDirectionChange("asc")}
                  type="button"
                >
                  Asc
                </button>
                <button
                  className={`toolbar__sort-option${
                    sortDirection === "desc"
                      ? " toolbar__sort-option--active"
                      : ""
                  }`}
                  onClick={() => handleDirectionChange("desc")}
                  type="button"
                >
                  Desc
                </button>
              </div>
            </div>
          )}
        </span>

        <div className="toolbar__add-dropdown-wrapper" ref={addDropdownRef}>
          <button
            className="btn btn--pill toolbar__add"
            aria-label="Add item"
            onClick={() => setShowAddDropdown((v) => !v)}
            type="button"
          >
            <Plus className="icon icon--sm" />
            <span className="btn__label">Add Module</span>
            <ChevronDown className="icon icon--sm toolbar__add-chevron" />
          </button>
          {showAddDropdown && (
            <div className="toolbar__add-dropdown">
              <button
                onClick={() => openModal("AddBasicModal")}
                className="toolbar__add-option"
                type="button"
              >
                <List className="icon icon--sm toolbar__add-option-icon" />
                <span>Add from Basic List</span>
              </button>
              <button
                onClick={() => openModal("AddModuleModal")}
                className="toolbar__add-option"
                type="button"
              >
                <User className="icon icon--sm toolbar__add-option-icon" />
                <span>Add from Your Modules</span>
              </button>
              <button
                onClick={() => openModal("AddNewModal")}
                className="toolbar__add-option"
                type="button"
              >
                <Sparkle className="icon icon--sm toolbar__add-option-icon" />
                <span>Add New Custom</span>
              </button>
            </div>
          )}
        </div>

        <div className="toolbar__view" aria-label="View toggles">
          <button
            onClick={() => setViewMode("grid")}
            className={
              "btn btn--icon toolbar__view-btn" +
              (viewMode === "grid" ? " btn_active" : "")
            }
            aria-label="Grid view"
          >
            <Grid3X3 className="icon" />
          </button>
          <button
            onClick={() => setViewMode("row")}
            className={
              "btn btn--icon toolbar__view-btn" +
              (viewMode === "row" ? " btn_active" : "")
            }
            aria-label="List view"
          >
            <Rows3 className="icon" />
          </button>
        </div>
      </div>

      {/* Category chips */}
      <div className="toolbar__chips" aria-label="Categories">
        {["all", ...allCategories].map((c) => {
          const isActive =
            c === "all"
              ? selectedCategories.length === 0
              : selectedCategories.includes(c);
          return (
            <button
              key={c}
              className={`chip${isActive ? " chip--active" : ""}`}
              onClick={() => onCategoryToggle(c)}
              type="button"
            >
              {c === "all" ? "All" : capitalizeFirstLetter(c)}
            </button>
          );
        })}
      </div>

      {/* Stats footer */}
      {/* Todo later */}
      {/* <div className="toolbar__stats" aria-live="polite">
        <span>Total Components: 7</span>
        <span>Categories: 9</span>
        <span>Low Stock: 3</span>
      </div> */}
    </div>
  );
}

export default Toolbar;
