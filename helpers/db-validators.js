const User = require("../models/user");

const existEmail = async (email = "") => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`el email ${email} ya está en uso`);
  }
};

const existUserById = async (id = "") => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`el id: ${id} no existe`);
  }
};

module.exports = { existEmail, existUserById };
