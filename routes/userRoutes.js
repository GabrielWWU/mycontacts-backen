const express = require("express");
const validateTokenHandler = require("../middleware/validateTokenHandler")

const router = express.Router()
const {
  registerUser,
  loginUser,
  currentUser} = require("../controllers/userController")

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", validateTokenHandler, currentUser)


module.exports = router