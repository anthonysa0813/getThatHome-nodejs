const { Schema, model } = require("mongoose");

const PropertySchema = Schema({
  operation_type: {
    type: String,
    enum: ["RENT", "SALE"],
    required: [true, "the operation type is required"],
  },
  address: {
    type: String,
    required: [true, "the address is required"],
  },
  montly_rent: {
    type: String,
    required: [true, "the montly rent is required"],
  },
  maintance: {
    type: String,
    required: [true, "the maintainance is required"],
  },
  property_type: {
    type: String,
    enum: ["APARTMENT", "HOUSE"],
    required: [true, "the operation type is required"],
  },
  bedrooms: {
    type: String,
    required: [true, "the bedrooms is required"],
  },
  bathrooms: {
    type: String,
    required: [true, "the bathrooms is required"],
  },
  land: {
    type: String,
    required: [true, "the land type is required"],
  },
  petsAllowed: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: [true, "the description is required"],
  },
  photoPrimary: {
    type: String,
    required: [true, "the photo primary is required"],
  },
  photoSecondary: {
    type: String,
    required: false,
  },
  userRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "the user is required"],
  },
});

PropertySchema.methods.toJSON = function () {
  const { _id, ...property } = this.toObject();
  return {
    uid: _id,
    ...property,
  };
};

module.exports = model("Property", PropertySchema);
