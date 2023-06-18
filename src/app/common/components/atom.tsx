import { atom } from "jotai";

export const optimizeFileListAtom = atom<Array<File>>([]);
export const optimizedFileDownload = atom<File | null>(null);
