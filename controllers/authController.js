// src/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Auth({ ...req.body, password: hashedPassword });
    const user = await newUser.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({
      message: "User created successfully.",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: "Logged In Successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
