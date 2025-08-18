import { useState } from "react";
import { sendAssistantMessage } from "../api/assistant";

/**
 * Custom hook to manage assistant chat state and API calls.
 */
export function useAssistant() {
  const [messages, setMessages] = useState([]); // {role, content}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (userMessage) => {
    setLoading(true);
    setError(null);
    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    try {
      const conversation = [
        ...messages,
        { role: "user", content: userMessage },
      ];
      const reply = await sendAssistantMessage(conversation);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err.message || "Error sending message");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([]);
    setError(null);
  };

  return { messages, loading, error, sendMessage, reset };
}
