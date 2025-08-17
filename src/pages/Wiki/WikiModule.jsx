import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useWikiByUsernameSlug } from "../../hooks/useModules";
import "./WikiModule.css";

function WikiModule() {
  const { username, slug } = useParams();
  const navigate = useNavigate();
  const {
    data: module,
    isLoading,
    isError,
    error,
  } = useWikiByUsernameSlug(username, slug);

  useEffect(() => {
    if (
      isError &&
      error &&
      (error.status === 404 || error.response?.status === 404)
    ) {
      navigate("/notfound", { replace: true });
    }
  }, [isError, error, navigate]);

  if (isLoading)
    return <div className="wiki-module wiki-module--loading">Loading...</div>;
  if (isError) return null;
  if (!module) return null;

  return (
    <div className="wiki-module">
      <div className="wiki-module__header">
        <img
          className="wiki-module__image"
          src={module.image?.url}
          alt={module.name}
        />
        <div className="wiki-module__info">
          <h1 className="wiki-module__title">{module.name}</h1>
          <p className="wiki-module__owner">
            by <span>{username}</span>
          </p>
        </div>
      </div>
      <div className="wiki-module__body">
        <p className="wiki-module__description">{module.description}</p>
        {module.model && (
          <div className="wiki-module__row">
            <b>Model:</b> {module.model}
          </div>
        )}
        {module.category?.length > 0 && (
          <div className="wiki-module__row">
            <b>Categories:</b> {module.category.join(", ")}
          </div>
        )}
        {module.exampleIdeas?.length > 0 && (
          <div className="wiki-module__row">
            <b>Example Ideas:</b> {module.exampleIdeas.join(", ")}
          </div>
        )}
        <div className="wiki-module__row">
          <b>Official:</b> {module.isOfficial ? "Yes" : "No"}
        </div>
        <div className="wiki-module__row">
          <b>Created:</b> {new Date(module.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default WikiModule;
