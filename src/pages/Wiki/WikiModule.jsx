import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWikiByUsernameSlug } from "../../hooks/useModules";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  BookOpen,
  Tag,
  Lightbulb,
  BadgeCheck,
  Cpu,
  Pencil,
} from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useModalStore } from "../../stores/useModalStore";
import "./WikiModule.css";

function WikiModule() {
  const { username, slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const openModal = useModalStore((s) => s.openModal);
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

  const codeSnippets = module.codeSnippets || {};
  const hasCpp = codeSnippets.cpp && codeSnippets.cpp.trim() !== "";
  const hasPython = codeSnippets.python && codeSnippets.python.trim() !== "";
  const isUserModule =
    user &&
    (module.owner === user.id ||
      module.owner === user._id ||
      module.owner === user.username);
  const hasAny = hasCpp || hasPython;

  return (
    <div className="wiki-module wiki-module--modern wiki-module--whitebg">
      <div className="wiki-module__header-row">
        <h1 className="wiki-module__title wiki-module__title--main">
          <BookOpen
            size={32}
            style={{ marginRight: 10, verticalAlign: "middle" }}
          />
          {module.name}
        </h1>
        {isUserModule && (
          <button
            className="wiki-module__edit-btn"
            title="Edit module"
            onClick={() => openModal("EditModal", { moduleId: module._id })}
          >
            <Pencil size={28} strokeWidth={2.2} color="#2563eb" />
          </button>
        )}
      </div>
      <div className="wiki-module__toprow wiki-module__toprow--wide">
        <div className="wiki-module__leftinfo">
          <div
            className="wiki-module__categories"
            style={{ background: "none", border: "none" }}
          >
            <div className="wiki-module__field-label">
              <Tag
                size={18}
                style={{ marginRight: 4, verticalAlign: "middle" }}
              />
              Categories:
            </div>
            <div className="wiki-module__field-value wiki-module__pills">
              {module.category?.length > 0 ? (
                module.category.map((cat, idx) => (
                  <span
                    className="wiki-module__pill wiki-module__pill--nobg"
                    key={cat + idx}
                  >
                    {cat}
                  </span>
                ))
              ) : (
                <span className="wiki-module__empty">None</span>
              )}
            </div>
          </div>
          <div
            className="wiki-module__ideas"
            style={{ background: "none", border: "none" }}
          >
            <div className="wiki-module__field-label">
              <Lightbulb
                size={18}
                style={{ marginRight: 4, verticalAlign: "middle" }}
              />
              Example Ideas:
            </div>
            <div className="wiki-module__field-value wiki-module__pills">
              {module.exampleIdeas?.length > 0 ? (
                module.exampleIdeas.map((idea, idx) => (
                  <span
                    className="wiki-module__pill wiki-module__pill--nobg"
                    key={idea + idx}
                  >
                    {idea}
                  </span>
                ))
              ) : (
                <span className="wiki-module__empty">None</span>
              )}
            </div>
          </div>
        </div>
        <div className="wiki-module__rightinfo wiki-module__rightinfo--main">
          <div className="wiki-module__imagebox wiki-module__imagebox--main">
            <img
              className="wiki-module__image wiki-module__image--main"
              src={module.image?.url}
              alt={module.name}
            />
          </div>
          <div className="wiki-module__basicinfo wiki-module__basicinfo--main">
            <div className="wiki-module__modelrow">
              <Cpu
                size={18}
                style={{ marginRight: 6, verticalAlign: "middle" }}
              />
              <span className="wiki-module__field-label">Model:</span>
              <span className="wiki-module__field-value">
                {module.model || (
                  <span className="wiki-module__empty">N/A</span>
                )}
              </span>
            </div>
            {module.isOfficial && (
              <span className="wiki-module__official" title="Official module">
                <BadgeCheck
                  size={18}
                  style={{ marginRight: 4, verticalAlign: "middle" }}
                />
                Official
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="wiki-module__description-label">Description</div>
      <div className="wiki-module__description">{module.description}</div>
      {hasAny && (
        <div
          className={`wiki-module__codesnippets${
            hasCpp && hasPython ? " wiki-module__codesnippets--dual" : ""
          }`}
        >
          {hasCpp && hasPython ? (
            <>
              <div className="wiki-module__codesnippet wiki-module__codesnippet--half">
                <div className="wiki-module__codesnippet-label">
                  Arduino (C++)
                </div>
                <SyntaxHighlighter
                  language="cpp"
                  style={prism}
                  customStyle={{
                    background: "#fff",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    padding: "1rem",
                    minHeight: "120px",
                    margin: 0,
                    border: "1px solid #e5e7eb",
                  }}
                  showLineNumbers
                >
                  {codeSnippets.cpp}
                </SyntaxHighlighter>
              </div>
              <div className="wiki-module__codesnippet wiki-module__codesnippet--half">
                <div className="wiki-module__codesnippet-label">Python</div>
                <SyntaxHighlighter
                  language="python"
                  style={prism}
                  customStyle={{
                    background: "#fff",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    padding: "1rem",
                    minHeight: "120px",
                    margin: 0,
                    border: "1px solid #e5e7eb",
                  }}
                  showLineNumbers
                >
                  {codeSnippets.python}
                </SyntaxHighlighter>
              </div>
            </>
          ) : (
            <div className="wiki-module__codesnippet wiki-module__codesnippet--full">
              <div className="wiki-module__codesnippet-label">
                {hasCpp ? "Arduino (C++)" : "Python"}
              </div>
              <SyntaxHighlighter
                language={hasCpp ? "cpp" : "python"}
                style={prism}
                customStyle={{
                  background: "#fff",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  padding: "1rem",
                  minHeight: "120px",
                  margin: 0,
                  border: "1px solid #e5e7eb",
                }}
                showLineNumbers
              >
                {hasCpp ? codeSnippets.cpp : codeSnippets.python}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WikiModule;
