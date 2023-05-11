import express from "express";
import { cerrarSesion, homePage, login, loginPage, register, registerPage } from "../controller/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationRestultExpress.js";
const router = express.Router();
import { Auth } from "../passport/auth.js";


router.get("/home", Auth, homePage)

router.get("/login", loginPage)
router.post("/login", login)

router.get("/logout", cerrarSesion)




router.get("/register", registerPage)
router.post("/register", register)
// router.post("/register", [body("email", "El formato de email no es correcto.").trim().isEmail().normalizeEmail(), body("password", "El formato de la contraseña debe tener mínimo 6 carácteres.").trim().isLength({ min: 6 })], validationResultExpress, register);
export default router;
