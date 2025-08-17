import React from "react";
import { useDropzone } from "react-dropzone";
import { Image as LucideImage } from "lucide-react";

function FileUploaderRHF({ name, setValue, watch, error }) {
  const file = watch(name);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) setValue(name, file, { shouldValidate: true });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <div className="file-uploader">
      <div {...getRootProps()} className="file-uploader__dropzone">
        <input {...getInputProps()} />
        <p className="file-uploader__prompt">
          <LucideImage
            size={24}
            style={{ marginBottom: 4, color: "#64748b" }}
          />
          <span>
            {file ? file.name : "Click or drag an image here to upload"}
          </span>
        </p>
      </div>

      {error && <p className="file-uploader__error">{error.message}</p>}
    </div>
  );
}

export default FileUploaderRHF;
