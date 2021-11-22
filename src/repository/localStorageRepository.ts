import { LocalStorage } from "node-localstorage";
import { Repository } from ".";
import { File } from "../entity/file";

export class LocalStorageRepository implements Repository {
  localStorage: LocalStorage;

  constructor(fileLocation: string) {
    this.localStorage = new LocalStorage(fileLocation);
  }

  async createFile(file: File): Promise<void> {
    const files = this.getFiles();
    files.push(file);
    this.saveFiles(files);
  }

  async getFileByKey(key: string): Promise<File | null> {
    const files = this.getFiles();

    const foundFile = files.find((file) => {
      return file.key === key;
    });

    if (foundFile === undefined) {
      return null;
    } else {
      return foundFile;
    }
  }

  private getFiles() {
    const raw = this.localStorage.getItem("files");
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as File[];
  }

  private saveFiles(files: File[]) {
    this.localStorage.setItem("files", JSON.stringify(files));
  }
}
