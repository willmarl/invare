import { useState, useMemo } from "react";
import { useModulesByUsername } from "../../hooks/useModules";
import { Link } from "react-router-dom";
import "./Wiki.css";

const BASE_USERNAME = "base";

function Wiki() {
  // Fetch all modules owned by 'base' (system modules)
  const {
    data: modules,
    isLoading,
    isError,
    error,
  } = useModulesByUsername(BASE_USERNAME);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Extract unique categories from modules
  const categories = useMemo(() => {
    if (!modules) return [];
    const cats = new Set();
    modules.forEach((mod) => {
      if (Array.isArray(mod.categories)) {
        mod.categories.forEach((c) => {
          if (c && typeof c === "string" && c.trim() !== "") cats.add(c);
        });
      } else if (
        mod.category &&
        typeof mod.category === "string" &&
        mod.category.trim() !== ""
      ) {
        cats.add(mod.category);
      }
    });
    return Array.from(cats).sort();
  }, [modules]);

  // Filter modules by selected category
  const filteredModules = useMemo(() => {
    if (!modules) return [];
    if (selectedCategory === "all") return modules;
    return modules.filter((mod) => {
      if (Array.isArray(mod.categories)) {
        return (
          mod.categories &&
          mod.categories.some(
            (c) =>
              c &&
              typeof c === "string" &&
              c.trim() !== "" &&
              c === selectedCategory
          )
        );
      } else if (
        mod.category &&
        typeof mod.category === "string" &&
        mod.category.trim() !== ""
      ) {
        return mod.category === selectedCategory;
      }
      return false;
    });
  }, [modules, selectedCategory]);

  return (
    <div className="wiki">
      <h1 className="wiki__title">Official Modules</h1>
      {isLoading && <div className="wiki__loading">Loading...</div>}
      {isError && (
        <div className="wiki__error">
          {error?.message || "Failed to load modules."}
        </div>
      )}
      {/* Category filter chips */}
      {modules && categories.length > 0 && (
        <div
          className="wiki__chips"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            margin: "1rem 0",
          }}
        >
          {["all", ...categories].map((cat) => (
            <button
              key={cat}
              className={
                "chip" + (selectedCategory === cat ? " chip--active" : "")
              }
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedCategory(cat)}
              type="button"
            >
              {cat === "all"
                ? "All"
                : String(cat).charAt(0).toUpperCase() + String(cat).slice(1)}
            </button>
          ))}
        </div>
      )}
      {modules && (
        <ul className="wiki__list">
          {filteredModules.map((mod) => (
            <li className="wiki__item" key={mod._id}>
              <Link className="wiki__link" to={`/wiki/base/${mod.slug}`}>
                <img
                  className="wiki__img"
                  src={mod.image?.url}
                  alt={mod.name}
                />
                <span className="wiki__name">{mod.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wiki;
