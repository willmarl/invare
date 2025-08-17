import React from "react";
import { useImageInput } from "./useImageInput";
import { X } from "lucide-react";
import "./ImageInput.css";

function ImageInput({ onChange }) {
  const {
    file,
    previewUrl,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile,
  } = useImageInput({ onFileChange: onChange });

  return (
    <div className="image-input">
      {!file && (
        <div
          {...getRootProps()}
          className={`image-input__dropzone ${
            isDragActive ? "image-input__dropzone--active" : ""
          }`}
        >
          <input {...getInputProps()} />
          <p>Click or drag an image</p>
        </div>
      )}

      {file && (
        <div className="image-input__preview-wrapper">
          <img
            src={previewUrl}
            alt="Preview"
            className="image-input__preview"
          />
          <button
            type="button"
            className="image-input__remove"
            onClick={removeFile}
            aria-label="Remove image"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageInput;
