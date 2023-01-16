const { request, response } = require("express");
const FavoriteModel = require("../models/Favorites");

const getFavorites = async (req = request, res = response) => {
  const { userId } = req.params;
  const PropertyFind = await FavoriteModel.find({
    userRef: userId,
  }).populate("propertyRef");
  res.json({
    message: "the favorites by user",
    userId: userId,
    data: PropertyFind,
  });
};

const createFavorites = async (req = request, res = response) => {
  const body = req.body;
  const favorites = new FavoriteModel(body);
  favorites.save();

  return res.json({
    favorites,
  });
};

module.exports = {
  getFavorites,
  createFavorites,
};
