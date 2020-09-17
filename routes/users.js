const express = require("express");
const passport = require("passport");

const router = express.Router();
const { register, signin } = require("../controllers/userController");

router.post("/register", register);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
