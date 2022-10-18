require("dotenv").config();
const boryParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const apiShortUrlRouter = require('./routes/apiShortUrlRouter')

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(boryParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (_req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use('/api/shorturl', apiShortUrlRouter)

app.use((error, _req, res, _next) => {
  if (error) {
    res.status(error.status || 500).json(error.message || "SERVER ERROR")
  }
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
