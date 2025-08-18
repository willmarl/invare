import Modal from "./Modal";
import { useModalStore } from "../../stores/useModalStore";
import { useAssistant } from "../../hooks/useAssistant";
import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./AssistantModal.css";

function AssistantModal() {
  const isOpen = useModalStore((s) => s.activeModal === "AssistantModal");
  const onClose = useModalStore((s) => s.closeModal);
  const { messages, loading, error, sendMessage, reset } = useAssistant();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Assistant">
      <div className="assistant-modal">
        <div className="assistant-modal__header-row">
          <button
            className="assistant-modal__new-chat-btn"
            type="button"
            onClick={reset}
            style={{
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "0.5em",
              padding: "0.4em 1em",
              fontWeight: 600,
              marginBottom: "0.5em",
            }}
            disabled={loading}
          >
            New Chat
          </button>
        </div>
        <div className="assistant-modal__messages">
          {messages.length === 0 && !loading && (
            <div className="assistant-modal__placeholder">
              Ask about your inventory, modules, or what you can build!
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`assistant-modal__message assistant-modal__message--${msg.role}`}
            >
              <span className="assistant-modal__role">
                {msg.role === "user" ? "You" : "Assistant"}:
              </span>
              <span className="assistant-modal__content">
                {msg.role === "assistant"
                  ? renderAssistantContent(msg.content)
                  : msg.content}
              </span>
            </div>
          ))}
          {loading && (
            <div className="assistant-modal__loading">
              <svg
                width="18"
                height="18"
                viewBox="0 0 50 50"
                style={{ marginRight: 4 }}
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="5"
                  strokeDasharray="31.4 31.4"
                  strokeLinecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="0.8s"
                    values="0 25 25;360 25 25"
                    keyTimes="0;1"
                  />
                </circle>
              </svg>
              Assistant is thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {error && <div className="assistant-modal__error">{error}</div>}
        <form className="assistant-modal__form" onSubmit={handleSubmit}>
          <input
            className="assistant-modal__input"
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            className="assistant-modal__send-btn"
            type="submit"
            disabled={loading || !input.trim()}
            style={{ background: "#2563eb", color: "#fff" }}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

// Helper to render assistant content with code blocks
function renderAssistantContent(content) {
  if (typeof content !== "string") return content;
  const codeBlockRegex = /```([a-zA-Z0-9]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;
  const elements = [];
  let key = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <span key={key++}>{content.slice(lastIndex, match.index)}</span>
      );
    }
    const language = match[1] || "text";
    const code = match[2];
    elements.push(
      <SyntaxHighlighter
        key={key++}
        language={language}
        style={oneDark}
        customStyle={{ borderRadius: "0.5em", margin: "0.5em 0" }}
        showLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    elements.push(<span key={key++}>{content.slice(lastIndex)}</span>);
  }
  return elements.length > 0 ? elements : content;
}

export default AssistantModal;
