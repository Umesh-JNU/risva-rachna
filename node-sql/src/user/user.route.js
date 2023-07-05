const express = require("express");
const { register, login } = require("./user.controller");
const { auth } = require("../../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
