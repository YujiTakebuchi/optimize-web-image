"use client";

import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { optimizeFileListAtom, optimizedFileDownload } from "./atom";

export const FileListInput: React.FC = () => {
  const [fileList, setFileList] = useAtom(optimizeFileListAtom);
  const [fileDownload, setFileDownload] = useAtom(optimizedFileDownload);
  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const convertUint8ArrayToBlob = (
    ua: Uint8Array,
    option: { mimeType: string }
  ) => {
    const blob = new Blob([ua.buffer], { type: option.mimeType });
    return blob;
  };

  const convertBlobToFile = (blob: Blob, fileName: string) => {
    const file = new File([blob], fileName);
    return file;
  };

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
      const formData: FormData = new FormData();
      formData.append("file", fl);
      console.log(formData);
      console.log(formData.get("file"));

      fetch("/api/", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          console.log(res);
          return res.body?.getReader();
        })
        .then((reader) => {
          reader?.read().then(({ value }) => {
            console.log(value);
            if (!value) throw new Error("Response value is undifined!!!");
            const blobData = convertUint8ArrayToBlob(value, {
              mimeType: "image/avif",
            });
            console.log(blobData);
            const fileData = convertBlobToFile(blobData, "test.avif");
            console.log(fileData);
            setFileDownload(fileData);
          });
        });
    });

    setFileList(enteredFileList);
  };

  return <input type="file" multiple onChange={handleChange} />;
};

export const FileDownloadButton: React.FC = () => {
  // TODO: ファイルをリストで扱えるように
  const [fileDownload, setFileDownload] = useAtom(optimizedFileDownload);
  if (!fileDownload) return <></>;
  const url = URL.createObjectURL(fileDownload);
  return (
    // TODO: ファイル名を動的に
    <a href={url} download={"download.avif"}>
      download AVIF!
    </a>
  );
};
