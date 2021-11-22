import { File } from "../entity/file";

export interface Repository {
  createFile(file: File): Promise<void>;
  getFileByKey(key: string): Promise<File | null>;
}
