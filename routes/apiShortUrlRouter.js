const express = require("express");
const { isHttpUri, isHttpsUri } = require("valid-url");
const { createAndSaveUrl, Url, findByShortUrl } = require("../db/connection");
const generateToken = require("../utils/generateShortUrl");

const router = express.Router();

router.get("/:short", (req, res) => {
  const { short } = req.params;
  const shortUrl = Number(short);

  findByShortUrl(shortUrl, (error, data) => {
    // if (error) return res.status(404).json(error);
    
    if (!data[0]?.original_url) return res.status(404).json({ error: "Short url not found"})
    res.redirect(data[0].original_url);
  });
});

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!isHttpUri(url) && !isHttpsUri(url)) {
    return res.status(200).json({ error: "invalid url" });
  }

  const short = generateToken();

  createAndSaveUrl(url, short, (error, data) => {
    if (error) return res.status(404).json(error);

    Url.findById(data._id, (err, uri) => {
      if (err) return res.status(404).json(err);
      const { original_url, short_url } = uri;
      res.status(200).json({ original_url, short_url });
    });
  });
});

module.exports = router;
