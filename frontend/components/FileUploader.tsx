"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import {MAX_FILE_SIZE} from "@/constants/index"
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

  const { getRootProps, getInputProps,isDragActive } = useDropzone({
    onDrop,
    maxSize:MAX_FILE_SIZE
  });

return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer border-2 border-dashed rounded-xl p-6 transition-colors",
        isDragActive ? "border-brand bg-brand/5" : "border-light-400",
        className
      )}
    >
      <input {...getInputProps()} />
      <p className="body-2 text-center text-light-100">
        {isDragActive
          ? "Drop the files here..."
          : "Drag 'n' drop some files here, or click to select files"}
      </p>
    </div>
  )
};

export default FileUploader;