const express = require("express");
const userRegisterController = require("../controller/register.controller");
const checkUserEmail = require("../controller/checkEmail.controller");
const router = express.Router();

router.post("/register", userRegisterController);
router.post("/email", checkUserEmail);

module.exports = router;
