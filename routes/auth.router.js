const { Router } = require("express");
const { login, signupUser } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const validatesFields = require("../middlewares/validates-fields");

const router = Router();

router.post(
  "/login",
  [
    check("email", "es obligatorio el email").isEmail(),
    check("password", "es obligatorio la contraseña").not().isEmpty(),
    validatesFields,
  ],
  login
);

router.post(
  "/signup",
  [
    check("email", "invalid email").isEmail(),
    check("password", "is necessary the password").not().isEmpty(),
    validatesFields,
  ],
  signupUser
);

module.exports = router;
