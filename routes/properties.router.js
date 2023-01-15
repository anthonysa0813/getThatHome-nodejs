const { Router } = require("express");
const {
  getAllProperties,
  getPropertyById,
  postProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/properties.controller");
const router = Router();
const { validateJWT } = require("../middlewares/validate-jwt");
const validatesFields = require("../middlewares/validates-fields");
const { check } = require("express-validator");
const ExistId = require("../helpers/existId");

router.get("/", [validateJWT], getAllProperties);
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "the id invalid").not().isEmpty().isMongoId(),
    check("id").custom(ExistId),
    validatesFields,
  ],
  getPropertyById
);

// agregar un middlware si el usuario existe custom
router.post(
  "/",
  [
    validateJWT,
    check("operation_type", "the operation type is required")
      .not()
      .isEmpty()
      .isIn(["RENT", "SALE"]),
    check("address", "the address is required").not().isEmpty(),
    check("montly_rent", "the montly rent is required").not().isEmpty(),
    check("maintance", "the maintainance is required").not().isEmpty(),
    check("property_type", "").not().isEmpty().isIn(["APARTMENT", "HOUSE"]),
    check("bedrooms", "the bedrooms is required").not().isEmpty(),
    check("bathrooms", "the bathrooms is required").not().isEmpty(),
    check("land", "").not().isEmpty(),
    check("petsAllowed").isBoolean(),
    check("description", "the description is required").not().isEmpty(),
    check("photoPrimary", "the photo primary is required").not().isEmpty(),
    check("photoSecondary", "the photo secondary is required").not().isEmpty(),
    check("userRef", "the user is required").not().isEmpty().isMongoId(),
    validatesFields,
  ],
  postProperty
);

// aqui debo de agreagr un custom validate que verifique si el usuario existe. antes de llamar al controlador.
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "the id is invalid").not().isEmpty().isMongoId(),
    check("id").custom(ExistId),
    validatesFields,
  ],
  updateProperty
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "the id is invalid").not().isEmpty().isMongoId(),
    check("id").custom(ExistId),
    validatesFields,
  ],
  deleteProperty
);

module.exports = router;
