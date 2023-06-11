"use client";

import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { optimizeFileListAtom } from "./atom";

export const FileListInput: React.FC = () => {
  const [fileList, setFileList] = useAtom(optimizeFileListAtom);
  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const enteredFileListObject = e.currentTarget.files;
    const enteredFileListObjectLength = enteredFileListObject?.length;
    if (!enteredFileListObjectLength) return;
    const enteredFileList = new Array(enteredFileListObjectLength)
      .fill(null)
      .map((_, idx) => enteredFileListObject[idx]);
    console.log(enteredFileList);
    console.log(typeof enteredFileList);

    fetch("/api/", {
      method: "GET",
      headers: {},
    }).then((res) => {
      const resultJSON = JSON.stringify(res);
      console.log(res);
      console.log(resultJSON);
    });

    enteredFileList.map((fl) => {
      fetch("/api/", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: fl,
      }).then((res) => {
        const resultJSON = JSON.stringify(res);
        console.log(res);
        console.log(resultJSON);
      });
    });

    setFileList(enteredFileList);
  };

  return <input type="file" multiple onChange={handleChange} />;
};
