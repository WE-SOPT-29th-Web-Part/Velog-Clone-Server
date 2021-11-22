import { Router } from "express";
import { Repository } from "../repository";

import setFileEndpoint from "./file";
import setArticleEndpoint from "./article";

export async function getAPIEndpoints(db: Repository): Promise<Router> {
  const apiRouter = Router();

  setFileEndpoint(apiRouter, db);
  setArticleEndpoint(apiRouter, db);

  return apiRouter;
}
