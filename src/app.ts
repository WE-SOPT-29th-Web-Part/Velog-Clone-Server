import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";
import { getAPIEndpoints } from "./endpoint";
import { LocalStorageRepository } from "./repository/localStorageRepository";
import printer from "./utils/printer";

interface ServerError {
  code: string;
}

interface AppConfig {
  port: number;
}

export async function createApp(config: AppConfig) {
  const app = express();
  const db = new LocalStorageRepository("data/db");

  app.use(morgan("dev"));

  const apiRouter = await getAPIEndpoints(db);
  app.use("/api", apiRouter);

  app.use("*", (req, res) => {
    res.status(404).json({ message: "올바르지 않은 경로입니다." });
  });
  app.use(defaultErrorHandler());

  function start() {
    printer.info("#########################");
    printer.info("# Velog Clone 미니 서버 #");
    printer.info("#########################");

    app
      .listen(config.port, () => {
        printer.info(`서버를 시작했습니다. [http://localhost:${config.port}]`);
      })
      .on("error", (err: ServerError) => {
        if (err.code === "EADDRINUSE") {
          printer.error(
            `서버 시작에 실패했습니다. ${config.port}번 포트를 다른 프로그램이 사용중입니다.`
          );
        } else {
          printer.error(err);
        }
      });
  }

  return {
    start,
  };
}

function defaultErrorHandler(): ErrorRequestHandler {
  return (err, req, res, next) => {
    res.status(500).json({ message: err.toString() });
    throw err;
  };
}
