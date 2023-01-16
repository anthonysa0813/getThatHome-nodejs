const { Schema, model } = require("mongoose");

const FavoritesSchema = Schema({
  userRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "the user is required"],
  },
  propertyRef: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: [true, "the property is required"],
  },
});

module.exports = model("Favorites", FavoritesSchema);
