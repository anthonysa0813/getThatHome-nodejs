const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization");
  // console.log(token);

  // verificando si  trae el token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token found",
    });
  }

  // validación de token
  try {
    const { uid } = jwt.verify(token, process.env.MYSECRETKEYORPUBLIC);
    const usuario = await User.findOne({ uid });
    if (!usuario) {
      return res.status(401).json({
        message: "token invalid",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: "TOken Not Valid",
    });
  }
};

module.exports = {
  validateJWT,
};
