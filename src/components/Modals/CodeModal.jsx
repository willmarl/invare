import Modal from "./Modal";
import { useModalStore } from "../../stores/useModalStore";
import { useModule } from "../../hooks/useModules";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Pencil } from "lucide-react";
import { useState, useEffect } from "react";

import "./CodeModal.css";

function CodeModal() {
  const isOpen = useModalStore((s) => s.activeModal);
  const onClose = useModalStore((s) => s.closeModal);
  const modalData = useModalStore((s) => s.modalData);
  const moduleId = modalData?.moduleId;
  const { data: module, isLoading } = useModule(moduleId);
  const [lang, setLang] = useState(null);
  const [copied, setCopied] = useState(false);

  const codeSnippets = module?.codeSnippets || {};
  const hasCpp = codeSnippets.cpp && codeSnippets.cpp.trim() !== "";
  const hasPython = codeSnippets.python && codeSnippets.python.trim() !== "";
  const hasAny = hasCpp || hasPython;

  const showToggle = hasCpp || hasPython;

  // Set default language to the first available
  useEffect(() => {
    if (!lang) {
      if (hasCpp) setLang("cpp");
      else if (hasPython) setLang("python");
    }
  }, [lang, hasCpp, hasPython]);

  let code = "";
  let language = "text";
  if (lang === "cpp" && hasCpp) {
    code = codeSnippets.cpp;
    language = "cpp";
  } else if (lang === "python" && hasPython) {
    code = codeSnippets.python;
    language = "python";
  } else if (hasCpp) {
    code = codeSnippets.cpp;
    language = "cpp";
  } else if (hasPython) {
    code = codeSnippets.python;
    language = "python";
  }

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  if (!moduleId) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Code Snippet">
      <div className="code-modal">
        {isLoading ? (
          <div className="code-modal__loading">Loading...</div>
        ) : !hasAny ? (
          <div className="code-modal__empty">
            This module has no code snippets.
          </div>
        ) : (
          <>
            <div className="code-modal__actions">
              {showToggle && (
                <div className="code-modal__toggle">
                  <button
                    className={`code-modal__toggle-btn${
                      lang === "cpp" ? " code-modal__toggle-btn--active" : ""
                    }${!hasCpp ? " code-modal__toggle-btn--disabled" : ""}`}
                    onClick={() => hasCpp && setLang("cpp")}
                    disabled={!hasCpp}
                    title={
                      hasCpp ? undefined : "No Arduino (C++) code available"
                    }
                  >
                    Arduino (C++)
                  </button>
                  <button
                    className={`code-modal__toggle-btn${
                      lang === "python" ? " code-modal__toggle-btn--active" : ""
                    }${!hasPython ? " code-modal__toggle-btn--disabled" : ""}`}
                    onClick={() => hasPython && setLang("python")}
                    disabled={!hasPython}
                    title={hasPython ? undefined : "No Python code available"}
                  >
                    Python
                  </button>
                </div>
              )}
              <button
                className="code-modal__icon-btn"
                onClick={handleCopy}
                title="Copy to clipboard"
                style={{ marginLeft: 8 }}
              >
                <Copy size={18} />{" "}
                {copied && <span className="code-modal__copied">Copied!</span>}
              </button>
            </div>
            <div className="code-modal__code-block">
              <SyntaxHighlighter
                language={language}
                style={prism}
                customStyle={{
                  background: "#f8fafc",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  padding: "1rem",
                  minHeight: "120px",
                  margin: 0,
                }}
                showLineNumbers
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default CodeModal;
