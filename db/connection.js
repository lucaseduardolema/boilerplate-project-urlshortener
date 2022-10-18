require("dotenv").config();
const Mongoose = require("mongoose");

Mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(() => console.error("Database connection error"));

const urlSchema = new Mongoose.Schema({
  original_url: String,
  short_url: Number,
});

const Url = Mongoose.model("Urls", urlSchema);

const createAndSaveUrl = (originalUrl, shortUrl, done) => {
  const url = new Url({
    original_url: originalUrl,
    short_url: shortUrl,
  });

  url.save((error, data) => {
    if (error) console.log(error);
    done(error, data);
  });
};

const findByShortUrl = (shortUrl, done) => {
  console.log(typeof shortUrl);

  Url.find({ short_url: shortUrl }, (error, data) => {
    // if (error) console.log(error);

    done(error, data);
  });
};

module.exports = {
  Url,
  createAndSaveUrl,
  findByShortUrl,
};
