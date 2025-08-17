import { getKyClient } from "../utils/kyClient";

const api = getKyClient("v1");

/**
 * Upload one or more files with additional fields (e.g. name, desc)
 * @param {Object} params
 * @param {File[]} params.files - array of File objects (optional)
 * @param {Object} params.fields - key-value pairs for text fields (optional)
 * @param {string} [params.endpoint="upload"] - endpoint to hit (default: /upload)
 * @returns {Promise<any>}
 */

export async function uploadMultipart({
  files = [],
  fields = {},
  endpoint = "upload",
}) {
  const form = new FormData();

  // Append files (optional)
  files.forEach((file) => {
    // Use 'files' if backend expects a single files field
    // Otherwise 'image' or configurable
    form.append("file", file);
  });

  // Append additional fields
  for (const [key, value] of Object.entries(fields)) {
    form.append(key, value);
  }

  try {
    const res = await api
      .post(endpoint, {
        body: form,
      })
      .json();

    return res.data;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
}
