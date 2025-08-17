// BaseDropzone.jsx
import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";

export function useFileDropzone({ maxFiles = 1, accept = { "image/*": [] } }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles.slice(0, maxFiles));
    },
    [maxFiles]
  );

  const dz = useDropzone({
    onDrop,
    multiple: maxFiles > 1,
    maxFiles,
    accept,
  });

  const removeFile = (name) =>
    setFiles((prev) => prev.filter((f) => f.name !== name));

  return {
    files,
    setFiles,
    removeFile,
    ...dz,
  };
}
