import { Router } from "express";
import { Repository } from "../repository";

import setFileEndpoint from "./file";

export async function getAPIEndpoints(db: Repository): Promise<Router> {
  const apiRouter = Router();

  setFileEndpoint(apiRouter, db);

  return apiRouter;
}
