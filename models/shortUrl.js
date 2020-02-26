const mongoose = require("mongoose");
const shortid = require("shortid");

module.exports = mongoose.model(
  "shorturls",
  new mongoose.Schema({
    full: { type: String, required: true, trim: true },
    short: { type: String, default: shortid.generate() },
    clicks: { type: Number, default: 0 }
  })
);
