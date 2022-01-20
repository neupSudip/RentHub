const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var crypto = require("crypto");

const User = require("../models/user");
const Temp = require("../models/tempUser");
const sendEmail = require("../controllers/sendEmail");

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Password doesn't match" });

    if (!user.isVerified) {
      return res.status(400).json({ message: "User is not verified" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.status(200).json({ result: user, token });
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

    res.status(200).json({ result: user, token });
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

    var id = crypto.randomBytes(20).toString("hex");
    var value = result._id.toString().concat(id);

    const temp = new Temp({
      userId: result._id.toString(),
      hash: value,
    });

    await temp.save();
    sendEmail(email, value);
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports.verifyuser = async (req, res) => {
  const { value } = req.params;
  const id = value.slice(0, 24);
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
