import { Router } from "express";
import { Repository } from "../repository";

import setFileEndpoint from "./file";
import setArticleEndpoint from "./article";

export async function getAPIEndpoints(
  db: Repository,
  config: { baseURL: string }
): Promise<Router> {
  const apiRouter = Router();

  setFileEndpoint(apiRouter, db, config);
  setArticleEndpoint(apiRouter, db);

  return apiRouter;
}
