const express = require("express");
const userRegisterController = require("../controller/register.controller");
const checkUserEmail = require("../controller/checkEmail.controller");
const checkPassword = require("../controller/checkPassword.controller");
const router = express.Router();

router.post("/register", userRegisterController);
router.post("/email", checkUserEmail);
router.post("/password", checkPassword);

module.exports = router;
