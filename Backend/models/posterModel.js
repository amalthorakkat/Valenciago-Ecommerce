const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

const Poster = mongoose.model("Poster", posterSchema);

module.exports = Poster;
