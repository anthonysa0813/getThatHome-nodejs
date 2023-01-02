const { check } = require("express-validator");
const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/users.controller");
const validatesFields = require("../middlewares/validates-fields");
const { existEmail, existUserById } = require("../helpers/db-validators");
const router = Router();

router.get("/", getAllUsers);

router.post(
  "/",
  [
    check("email", "el email es inválido").isEmail(),
    check(
      "password",
      "el  password debe de ser igual o más de 6 caracteres"
    ).isLength({ min: 6 }),
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("role", "el rol de usuario").isIn(["SEEKER_ROLE", "LANDLORD_ROLE"]),
    check("email", "el email ya está registrado").custom(existEmail),
    validatesFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    check("id", "el id es inválido").isMongoId(),
    check("id", "el id no existe").custom(existUserById),
    validatesFields,
  ],
  editUser
);

router.delete(
  "/:id",
  [
    check("id", "el id no es válido").isMongoId(),
    check("id", "El usuario con este id no existe").custom(existUserById),
    validatesFields,
  ],
  deleteUser
);

module.exports = router;
