const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/user");
const Temp = require("../models/tempUser");
const sendEmail = require("../controllers/sendEmail");
const { use } = require("../routes/user");

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "Invalid email/password" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid email/password" });

    if (!user.isVerified) {
      return res.status(400).json({ message: "User is not verified" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    const storage = {
      _id: user._id,
      email: user.email,
      image: user.image,
      isVerified: user.isVerified,
      name: user.name,
      userType: user.userType,
    };

    res.status(200).json({ result: storage, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.signingoogle = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User does not exist" });

    const token = jwt.sign(
      { email: user.email, id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    const storage = {
      _id: user._id,
      email: user.email,
      image: user.image,
      isVerified: user.isVerified,
      name: user.name,
      userType: user.userType,
    };

    res.status(200).json({ result: storage, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.signup = async (req, res) => {
  const { email, firstName, lastName, password, userType, image, isVerified } =
    req.body;

  try {
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      userType,
      image,
      isVerified,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, userType: result.userType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    // if (!isVerified) {
    //   const hex = crypto.randomBytes(20).toString("hex");
    //   const hash = result._id.toString().concat(hex);

    //   const temp = new Temp({
    //     userId: result._id.toString(),
    //     hash: hash,
    //   });

    //   await temp.save();

    //   const html = `<h1>Please verify your email for RentHub.com by below link<h1/><br/><p>http://localhost:3000/verify/${hash}<p/>`;

    //   sendEmail(email, html, "Email Verification");
    // }

    const storage = {
      _id: result._id,
      email: result.email,
      image: result.image,
      isVerified: result.isVerified,
      name: result.name,
      userType: result.userType,
    };
    res.status(200).json({ storage, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports.verifyuser = async (req, res) => {
  const { value } = req.params;
  const id = value.slice(0, 24);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid Token" });
  }

  const user = await User.findOne({ _id: id });

  if (!user) return res.status(404).json({ message: "Invalid Token" });

  const tempValue = await Temp.findOne({ userId: id, hash: value });

  if (!tempValue) {
    return res
      .status(404)
      .json({ message: "Invalid verification credentials" });
  } else {
    user.isVerified = true;
    await tempValue.remove();
    await user.save();
    res.status(200).json({ message: "Redirecting..." });
  }
};

module.exports.checkSend = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User doesnot exist" });

    const tempValue = await Temp.findOne({ userId: user._id });
    if (tempValue)
      return res.status(404).json({ message: "Restricted multiple attempts" });

    const hex = crypto.randomBytes(20).toString("hex");
    const hash = user._id.toString().concat(hex);

    const temp = new Temp({
      userId: user._id.toString(),
      hash: hash,
    });

    await temp.save();
    const html = `<h1>Please use the link below to set new password<h1/><br/><p>http://localhost:3000/forget-password/${hash}<p/>`;

    sendEmail(email, html, "Password Reset");
    res.status(200).json({ message: "Please check your email" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports.forgetPassword = async (req, res) => {
  const { hash, pass } = req.body;
  const id = hash.slice(0, 24);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid Token" });
  }

  const user = await User.findOne({ _id: id });

  if (!user) return res.status(404).json({ message: "Invalid Token" });

  const tempValue = await Temp.findOne({ userId: id, hash: hash });

  if (!tempValue) {
    return res
      .status(404)
      .json({ message: "Invalid verification credentials" });
  } else {
    const hashedPassword = await bcrypt.hash(pass, 12);
    user.password = hashedPassword;

    await tempValue.remove();
    await user.save();
    res.status(200).json({ message: "Redirecting..." });
  }
};

module.exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.find(
      { _id: req.params.id },
      { _id: 0, name: 1, image: 1 }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
