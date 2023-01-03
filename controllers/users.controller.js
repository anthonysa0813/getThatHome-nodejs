const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getUserById = async (req = request, res = response) => {
  const { id } = req.params;
  console.log("usuario :D", id);
  const usuario = await User.findById(id);
  res.json({
    message: "user id",
    usuario,
  });
};

// url: localhost:8080/api/users?limit=10&offset=2
const getAllUsers = async (req, res = response) => {
  const { limit: limite = 10, offset = 0 } = req.query;
  // const users = await User.find().limit(Number(limite)).skip(Number(offset));
  // const total = await User.countDocuments();

  const [users] = await Promise.all([
    User.find().limit(Number(limite)).skip(Number(offset)),
    // User.countDocuments(),
  ]);

  if (limite && offset) {
    res.json({ users });
  } else {
    res.json({
      message: "Get all users",
    });
  }
};

const createUser = async (req = request, res = response) => {
  const { name, email, password, role, phone, status } = req.body;
  const user = await new User({
    name,
    email,
    password,
    role,
    phone,
    status,
  });

  // encriptar el password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    message: "Create an user",
    user,
  });
};

const editUser = async (req, res = response) => {
  const { id } = req.params;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, body);

  res.json({
    message: "Edit an user",
    id,
  });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  res.json({
    message: "Delete an user",
    id,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
};
