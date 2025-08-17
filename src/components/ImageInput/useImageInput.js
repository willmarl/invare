// useImageInput.js
import { useDropzone } from "react-dropzone";
import { useState, useCallback, useEffect } from "react";

export function useImageInput({
  defaultFile = null,
  maxSize = 5 * 1024 * 1024,
  onFileChange = () => {},
}) {
  const [file, setFile] = useState(defaultFile);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        const selected = acceptedFiles[0];
        setFile(selected);
        onFileChange(selected);
      }
    },
    [onFileChange]
  );

  const removeFile = () => {
    setFile(null);
    onFileChange(null);
  };

  useEffect(() => {
    if (!file || typeof file === "string") return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const { getRootProps, getInputProps, isDragActive, isDragReject, isFocused } =
    useDropzone({
      onDrop,
      multiple: false,
      maxSize,
      accept: { "image/*": [] },
    });

  return {
    file,
    previewUrl,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isFocused,
    removeFile,
  };
}
