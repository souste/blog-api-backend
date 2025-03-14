const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/sign-up", authController.validateUser, authController.createNewUser);
router.post("/login", authController.validateLogin, authController.loginUser);
// router.post("logout", authController.logoutUser);

module.exports = router;
