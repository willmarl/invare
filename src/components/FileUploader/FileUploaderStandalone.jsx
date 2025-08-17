import React from "react";
import { Image as LucideImage } from "lucide-react";
import { useFileDropzone } from "./BaseDropzone";
import { uploadMultipart } from "../../services/uploadClient";
import "./FileUploader.css";

function FileUploaderStandalone() {
  const { files, getRootProps, getInputProps, removeFile } = useFileDropzone({
    maxFiles: 1,
  });

  const handleUpload = async () => {
    await uploadMultipart({
      files,
      fields: { name: "Test", desc: "From page" },
    });
  };

  return (
    <div className="file-uploader">
      <div {...getRootProps()} className="file-uploader__dropzone">
        <input {...getInputProps()} />
        <p className="file-uploader__prompt">
          <LucideImage
            size={24}
            style={{ marginBottom: 4, color: "#64748b" }}
          />
          <span>Click or drag an image here to upload</span>
        </p>
      </div>

      <ul className="file-uploader__list">
        {files.map((file) => (
          <li key={file.name}>
            {file.name}
            <button onClick={() => removeFile(file.name)}>❌</button>
          </li>
        ))}
      </ul>

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUploaderStandalone;
