"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { cn, getFileType } from "@/lib/utils";
import { MAX_FILE_SIZE } from "@/constants/index";
import Thumbnail from "@/components/Thumbnail";

interface Props {
  ownerId?: string;
  accountId?: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE,
  });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className={cn("cursor-pointer", className)}>
      <input {...getInputProps()} />
      <div
        className={cn(
          "uploader-box border-2 border-dashed rounded-xl p-6 transition-colors",
          isDragActive ? "border-brand bg-brand/5" : "border-light-400"
        )}
      >
        <p className="body-2 text-center text-light-100">
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </div>

      {files.length > 0 && (
        <ul className="uploader-preview-list mt-4 space-y-2">
          <h4 className="h4 text-light-100">Files</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item flex items-center justify-between p-2 rounded-lg bg-light-300"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={URL.createObjectURL(file)}
                  />

                  <div className="preview-item-name">
                    <p className="body-2 text-light-100 max-w-[200px] truncate">
                      {file.name}
                    </p>
                    <Image
                      src="/assets/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Uploading..."
                    />
                  </div>
                </div>

                <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                  className="cursor-pointer"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;