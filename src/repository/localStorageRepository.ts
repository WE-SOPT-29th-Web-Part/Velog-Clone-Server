import { LocalStorage } from "node-localstorage";
import { nanoid } from "nanoid";
import { Repository } from ".";
import { Article } from "../entity/article";
import { File } from "../entity/file";
import { format } from "date-fns";

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

  async createArticle(article: Omit<Article, "id" | "date">): Promise<void> {
    const articles = await this.getArticles();
    articles.push({
      ...article,
      id: nanoid(),
      date: format(new Date(), "yyyy년 MM월 dd일"),
    });
    await this.saveArticles(articles);
  }

  async updateArticle(
    articleId: string,
    article: Omit<Article, "id" | "date">
  ): Promise<void> {
    const articles = await this.getArticles();
    const index = articles.findIndex((article) => article.id === articleId);
    if (index === -1) {
      throw new Error("삭제할 대상 글이 없습니다.");
    }

    articles[index] = { ...articles[index], ...article, id: articleId };

    await this.saveArticles(articles);
  }

  async getArticle(articleId: string): Promise<Article | null> {
    const articles = await this.getArticles();
    const foundArticle = articles.find((article) => article.id === articleId);

    if (foundArticle) {
      return foundArticle;
    } else {
      return null;
    }
  }

  async getArticles(): Promise<Article[]> {
    const raw = this.localStorage.getItem("articles");
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as Article[];
  }

  async deleteArticle(articleId: string): Promise<void> {
    const articles = await this.getArticles();
    const newArticles = articles.filter((article) => article.id !== articleId);
    await this.saveArticles(newArticles);
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

  private async saveArticles(articles: Article[]) {
    this.localStorage.setItem("articles", JSON.stringify(articles));
  }
}
