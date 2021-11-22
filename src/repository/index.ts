import { Article } from "../entity/article";
import { File } from "../entity/file";

export interface Repository {
  createFile(file: File): Promise<void>;
  getFileByKey(key: string): Promise<File | null>;

  createArticle(article: Omit<Article, "id">): Promise<void>;
  getArticle(articleId: string): Promise<Article | null>;
  getArticles(): Promise<Article[]>;
  updateArticle(articleId: string, article: Omit<Article, "id">): Promise<void>;
  deleteArticle(articleId: Article["id"]): Promise<void>;
}
