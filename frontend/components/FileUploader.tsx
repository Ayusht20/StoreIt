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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize:MAX_FILE_SIZE
  });

  return (
    <div {...getRootProps()} className={cn("cursor-pointer", className)}>
      <input {...getInputProps()} />
      <button type="button" className={cn("uploader-button")}>
        Upload
      </button>
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default FileUploader;