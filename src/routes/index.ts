import express from "express";
import { nanoid } from "nanoid";

import { formatResponse, validateUrl } from "../utils";
import applicationConfig from "../../config";
import { DrizzleUrlRepository } from "../repositories/url";

const router = express.Router();
const repository = new DrizzleUrlRepository();

router.post("/short", async (req, res) => {
  const { url } = req.body;
  const base = applicationConfig.base + "/api";

  console.log("Base", base);

  const urlId = nanoid();
  if (validateUrl(url)) {
    try {
      const oldUrl = await repository.findByUrl(url);

      if (oldUrl) {
        res.status(200).json({ url: oldUrl.shortUrl });
        return;
      }

      const newUrl = await repository.create({
        url,
        urlId,
        shortUrl: `${base}/${urlId}`,
      });

      if (newUrl instanceof Error) {
        res.status(500).json(formatResponse(500, "Server Error"));
        return;
      }

      res.status(200).json({ url: newUrl.shortUrl });
    } catch (err) {
      console.log(err);
      res.status(500).json(formatResponse(500, "Server Error"));
    }
  } else {
    res.status(400).json(formatResponse(400, "Invalid Original Url"));
  }
});

router.get("/:urlId", async (req, res) => {
  try {
    const { urlId } = req.params;

    if (!urlId) {
      res.status(400).json(formatResponse(400, "Url Id is required"));
      return;
    }

    const url = await repository.findByUrlId(urlId);

    if (!url) {
      res.status(404).json(formatResponse(404, "Url not found"));
      return;
    }

    res.redirect(url.url);
  } catch (err) {
    console.log(err);
    res.status(500).json(formatResponse(500, "Server Error"));
  }
});

router.delete("/:urlId", async (req, res) => {
  try {
    const { urlId } = req.params;

    if (!urlId) {
      res.status(400).json(formatResponse(400, "Url Id is required"));
      return;
    }

    const status = await repository.delete(urlId);

    res.status(200).json(formatResponse(200, status));
  } catch (err) {
    console.log(err);
    res.status(500).json(formatResponse(500, "Server Error"));
  }
});

export default router;
