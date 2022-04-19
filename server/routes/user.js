const express = require("express");

const { auth } = require("../middlewares/auth");

const {
  signin,
  signup,
  signingoogle,
  verifyuser,
  checkSend,
  getUserDetails,
  forgetPassword,
} = require("../controllers/user");

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signingoogle", signingoogle);
router.get("/verify/:value", verifyuser);
router.get("/forget/:email", checkSend);
router.post("/forget-password", forgetPassword);
router.get("/userdetails/:id", auth, getUserDetails);

module.exports = router;
