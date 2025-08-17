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

  return (
    <div className="wiki">
      <h1 className="wiki__title">Official Modules</h1>
      {isLoading && <div className="wiki__loading">Loading...</div>}
      {isError && (
        <div className="wiki__error">
          {error?.message || "Failed to load modules."}
        </div>
      )}
      {modules && (
        <ul className="wiki__list">
          {modules.map((mod) => (
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
