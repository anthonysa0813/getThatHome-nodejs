const { request, response } = require("express");
const Property = require("../models/Property");
const fileUpload = require("express-fileupload");

const getAllProperties = async (req = request, res = response) => {
  const { limit = 9, offset = 0 } = req.query;

  const properties = await Property.find()
    .limit(Number(limit))
    .skip(Number(offset))
    .populate("userRef");
  const total = await Property.countDocuments();

  res.json({
    data: properties,
    total,
  });
};

const getPropertyById = async (req = request, res = response) => {
  const { id } = req.params;

  const propertyById = await Property.findById(id).populate("userRef");

  res.json({
    data: propertyById,
  });
};

const postProperty = async (req = request, res = response) => {
  const { body } = req;
  const PropertyRes = await new Property(body);

  PropertyRes.save();

  res.json({
    message: "POST property",
    body,
  });
};

const updateProperty = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  const PropertyById = await Property.findByIdAndUpdate(id, body, {
    new: true,
  });

  return res.json({
    message: "PUT property ",
    data: PropertyById,
  });
};

const deleteProperty = async (req = request, res = response) => {
  const { id } = req.params;

  const PropertyById = await Property.findByIdAndDelete(id);

  return res.status(200).json({
    message: `the property ${id} was deleted successfully`,
  });
};

module.exports = {
  getAllProperties,
  getPropertyById,
  postProperty,
  updateProperty,
  deleteProperty,
};
