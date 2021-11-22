import { Router, static as staticServe } from "express";
import { Repository } from "../repository";
import { asyncRoute } from "../utils/endpoint";

import multer from "multer";
import { File } from "../entity/file";

function setEndpoint(router: Router, db: Repository) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "data/upload");
    },
    filename: function (req, file, cb) {
      const name = file.originalname;
      const [filename, ext] = extractFilename(name);

      cb(null, `${filename}_${Date.now()}.${ext}`);
    },
  });

  const upload = multer({ storage });

  router.post(
    "/image",
    upload.single("file"),
    asyncRoute(async (req, res) => {
      if (!req.file) {
        res.status(400).json({
          message: "요청에 올바른 file 필드가 없습니다.",
        });
        return;
      }

      const fileKey = req.file.filename;

      const fileInfo: File = {
        key: fileKey,
        name: req.file.originalname,
      };

      await db.createFile(fileInfo);

      res.status(200).json({
        key: fileKey,
      });
    })
  );

  router.use("/image", staticServe("data/upload"));
}

function extractFilename(filename: string) {
  const idx = filename.lastIndexOf(".");
  if (idx === -1) {
    return [filename, ""];
  }

  const name = filename.substring(0, idx);
  const ext = filename.substring(idx + 1);

  return [name, ext];
}

export default setEndpoint;
