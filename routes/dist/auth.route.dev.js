"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = require("../controller/auth.controller.js");

var _expressValidator = require("express-validator");

var _validationRestultExpress = require("../middlewares/validationRestultExpress.js");

var _auth = require("../passport/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/home", _auth.Auth, _authController.homePage);
router.get("/login", _authController.loginPage);
router.post("/login", _authController.login);
router.get("/logout", _authController.cerrarSesion);
router.get("/register", _authController.registerPage);
router.post("/register", _authController.register); // router.post("/register", [body("email", "El formato de email no es correcto.").trim().isEmail().normalizeEmail(), body("password", "El formato de la contraseña debe tener mínimo 6 carácteres.").trim().isLength({ min: 6 })], validationResultExpress, register);

var _default = router;
exports["default"] = _default;