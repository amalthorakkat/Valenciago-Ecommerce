const Poster = require("../models/posterModel");

module.exports.getAllPosters = async (req, res) => {
  try {
    const posters = await Poster.find(); // Assuming Poster is your model
    res.status(200).json({
      message: "Posters Fetched Successfully",
      data: posters,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports.createPoster = async (req, res) => {
  try {
    const posterDetails = req.body;
    const newPoster = new Poster(posterDetails);
    await newPoster.save();
    res
      .status(200)
      .json({ message: "Poster Created SuccessFully", poster: newPoster });
  } catch (error) {}
};
