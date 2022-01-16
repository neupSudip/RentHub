const express = require("express");
const {
  signin,
  signup,
  signingoogle,
  verifyuser,
} = require("../controllers/user");

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signingoogle", signingoogle);
router.get("/verify/:id/:hash", verifyuser);

module.exports = router;
