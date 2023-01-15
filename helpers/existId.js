const Property = require("../models/Property");

const ExistId = async (id) => {
  const property = await Property.findById(id);
  if (!property) {
    throw new Error("El id no existe en la DB");
  }
};

module.exports = ExistId;
