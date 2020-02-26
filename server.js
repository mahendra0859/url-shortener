const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ShortUrlModel = require("./models/shortUrl");

mongoose.connect(
  "mongodb://localhost/urlShortner",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err =>
    err
      ? console.error(`👺 ${err}`)
      : console.info("🗄  Data Base connected successfully 🗄")
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrlModel.find();
  res.render("index", { shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrlModel.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrlModel.findOne({ short: req.params.shortUrl });
  if (shortUrl) {
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
  } else res.sendStatus(404);
});
app.listen(process.env.PORT || 5000, () =>
  console.log(
    `🐬  web server is running on port ${process.env.PORT || 5000} 🐬`
  )
);
