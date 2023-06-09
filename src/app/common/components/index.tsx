"use client";

import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { optimizeFileListAtom } from "./atom";

export const FileListInput: React.FC = () => {
  const [fileList, setFileList] = useAtom(optimizeFileListAtom);
  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const enteredFileListObject = e.currentTarget.files;
    const enteredFileListObjectLength = enteredFileListObject?.length;
    if (!enteredFileListObjectLength) return;
    const enteredFileList = new Array(enteredFileListObjectLength)
      .fill(null)
      .map((_, idx) => enteredFileListObject[idx]);
    console.log(enteredFileList);
    console.log(typeof enteredFileList);
    setFileList(enteredFileList);
  };

  return <input type="file" multiple onChange={handleChange} />;
};
