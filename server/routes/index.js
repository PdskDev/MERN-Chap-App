const express = require("express");
const userRegisterController = require("../controller/register.controller");
const checkEmailController = require("../controller/email.controller");
const checkPasswordController = require("../controller/password.controller");
const router = express.Router();

router.post("/register", userRegisterController);
router.post("/email", checkEmailController);
router.post("/password", checkPasswordController);

module.exports = router;
