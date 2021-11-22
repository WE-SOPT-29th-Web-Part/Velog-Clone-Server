import { Response, Router } from "express";
import { Article } from "../entity/article";
import { Repository } from "../repository";
import { asyncRoute } from "../utils/endpoint";

function setEndpoint(router: Router, db: Repository) {
  router.get(
    "/article",
    asyncRoute(async (req, res) => {
      const articles = await db.getArticles();

      res.status(200).json(articles);
    })
  );

  router.get(
    "/article/:articleId",
    asyncRoute(async (req, res) => {
      const articleId = req.params.articleId;
      const article = await db.getArticle(articleId);

      if (article === null) {
        res.status(404).json({
          message: "해당 id의 게시글이 없습니다.",
        });
        return;
      }

      res.status(200).json(article);
    })
  );

  router.post(
    "/article",
    asyncRoute(async (req, res) => {
      if (articleFormatGuard(req.body, res)) {
        await db.createArticle(req.body);

        res.status(200).json({ success: true });
      }
    })
  );

  router.put(
    "/article/:articleId",
    asyncRoute(async (req, res) => {
      const articleId = req.params.articleId;
      const article = await db.getArticle(articleId);

      if (article === null) {
        res.status(404).json({
          message: "해당 id의 게시글이 없습니다.",
        });
        return;
      }

      if (articleFormatGuard(req.body, res)) {
        await db.updateArticle(articleId, article);

        res.status(200).json({ success: true });
      }
    })
  );

  router.delete(
    "/article/:articleId",
    asyncRoute(async (req, res) => {
      const articleId = req.params.articleId;
      const article = await db.getArticle(articleId);

      if (article === null) {
        res.status(404).json({
          message: "해당 id의 게시글이 없습니다.",
        });
        return;
      }
      await db.deleteArticle(articleId);
      res.status(200).json({ success: true });
    })
  );
}

function articleFormatGuard(
  obj: unknown,
  res: Response
): obj is Omit<Article, "id"> {
  if (typeof obj !== "object" || obj === null) {
    res.status(400).json({ message: `올바르지 않은 객체입니다.` });
    return false;
  }

  const toCheck: Array<keyof Omit<Article, "id">> = [
    "title",
    "body",
    "tags",
    "summary",
    "date",
    "thumbnail",
  ];

  for (const key of toCheck) {
    if ((obj as Article)[key] === undefined) {
      res.status(400).json({ message: `${key} 필드가 없습니다.` });
      return false;
    }
  }

  return true;
}

export default setEndpoint;
