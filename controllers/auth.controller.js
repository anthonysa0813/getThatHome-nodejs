const { request, response } = require("express");
const generateJWT = require("../helpers/generateJWT");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  // si el email existe
  const user = await User.findOne({ email });
  console.log({ user });
  if (!user) {
    return res.status(400).json({
      message: "Email ó password incorrectos - email",
    });
  }

  // si el password es el correcto
  const comparePassword = await bcryptjs.compareSync(password, user.password);
  if (!comparePassword) {
    return res.status(400).json({
      message: "El password es incorrecto",
    });
  }

  // generar JWT
  console.log({ uid: user.uid });
  const token = await generateJWT(user._id);

  res.json({
    message: "login ok",
    user,
    token,
  });
};

const signupUser = async (req = request, res = response) => {
  const { email, password, name, phone, role } = req.body;
  const data = {
    name,
    email,
    password,
    phone,
    role,
    status: true,
  };
  const user = await new User(data);

  // hashear el password
  const salt = await bcryptjs.genSaltSync();
  user.password = await bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    message: "signup",
    user,
  });
};

module.exports = {
  login,
  signupUser,
};
