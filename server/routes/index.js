const express = require("express");
const userRegisterController = require("../controller/register.controller");
const router = express.Router();

router.post("/register", userRegisterController);

module.exports = router;
