"use client";
import {useDropzone} from "react-dropzone";
import {cn} from "@/lib/utils"
const FileUploader = () => {
   const {getRootProps, getInputProps} = useDropzone({
    onDrop: acceptedFiles => {
      // Do something with the files, e.g. upload to a server
      console.log(acceptedFiles);
    }
  });
 
  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <button className={cn('uploader-button')}>

      </button>
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}

export default FileUploader
