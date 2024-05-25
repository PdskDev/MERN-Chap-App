const express = require("express");
const userRegisterController = require("../controller/register.controller");
const checkEmailController = require("../controller/email.controller");
const checkPasswordController = require("../controller/password.controller");
const userDetailsController = require("../controller/userDetails.controller");
const logoutController = require("../controller/logout.controller");
const router = express.Router();

router.post("/register", userRegisterController);
router.post("/email", checkEmailController);
router.post("/password", checkPasswordController);
router.get("/user-info", userDetailsController);
router.get("/logout", logoutController);

module.exports = router;
