// in my postman i make POST request to
// {{base_url}}/v1/assistant
// i did simple json body of "message": "what context do you have"
// but do follow the offical documentation for the open API
// giving roles and content field and whatever the official documentation says
import { apiV1 } from "../utils/kyClient";

/**
 * Send a chat message to the assistant API and get a reply.
 * @param {Array<{role: string, content: string}>} messages - The full conversation history.
 * @returns {Promise<string>} The assistant's reply.
 */
export async function sendAssistantMessage(messages) {
  try {
    const res = await apiV1
      .post("assistant", {
        json: { messages },
      })
      .json();
    return res.chatbotReply;
  } catch (err) {
    if (err?.response?.status === 401) {
      throw new Error("You must be logged in to use the assistant.");
    }
    throw new Error(
      err?.response?.data?.message || err?.message || "Assistant error."
    );
  }
}
