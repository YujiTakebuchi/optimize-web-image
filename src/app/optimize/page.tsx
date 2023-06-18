import { FileDownloadButton, FileListInput } from "../common/components";

export default function Home() {
  return (
    <div className="file-management">
      <div className="file-management__upload">
        <FileListInput />
      </div>
      <div className="file--management__download">
        <FileDownloadButton />
      </div>
    </div>
  );
}
