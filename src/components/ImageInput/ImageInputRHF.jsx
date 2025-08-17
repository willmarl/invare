import React from "react";
import { useImageInput } from "./useImageInput";
import { X } from "lucide-react";
import "./ImageInput.css";

function ImageInputRHF({ name, setValue, watch, error }) {
  const rhfValue = watch(name);
  const {
    file,
    previewUrl,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile,
  } = useImageInput({
    defaultFile: rhfValue,
    onFileChange: (file) => setValue(name, file, { shouldValidate: true }),
  });

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

      {error && <p className="image-input__error">{error.message}</p>}
    </div>
  );
}

export default ImageInputRHF;
