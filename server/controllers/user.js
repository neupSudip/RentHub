const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Temp = require("../models/tempUser");
const sendEmail = require("../controllers/sendEmail");

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't found" });

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
  console.log(email);
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't found" });

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

    const hash = hashedPassword;
    const temp = new Temp({
      hash,
      userId: result._id,
    });

    await temp.save();

    sendEmail(email, hash, result._id);

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports.verifyuser = async (req, res) => {
  const { id, hash } = req.params;
  console.log(id, hash);

  const user = await User.findOne({ _id: id });

  if (!user) return res.status(404).json({ message: "User doesn't found" });

  const tempValue = await Temp.findOne({ userId: id, hash: hash });

  if (!tempValue) {
    return res
      .status(404)
      .json({ message: "Invalid verification credentials" });
  } else {
    user.isVerified = true;
    await user.save();
  }
};
