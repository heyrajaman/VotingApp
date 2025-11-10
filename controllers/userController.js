const User = require("../models/user");
const { generateToken } = require("../utils/jwtHelper");

const signup = async (req, res) => {
  try {
    const data = req.body;

    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === "admin" && adminUser) {
      return res.status(400).json({ error: "Admin user already exists" });
    }

    if (!/^\d{12}$/.test(data.aadharCardNumber)) {
      return res
        .status(400)
        .json({ error: "Aadhar card number must be exactly 12 digits" });
    }

    const existingUser = await User.findOne({
      aadharCardNumber: data.aadharCardNumber,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with same aadhar number already exists" });
    }

    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved");

    const payload = { id: response.id };
    const token = generateToken(payload);
    console.log("token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const { aadharCardNumber, password } = req.body;

    if (!aadharCardNumber || !password) {
      return res
        .status(401)
        .json({ error: "Aadhar card number and password is required" });
    }

    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "invalid username and password" });
    }

    const payload = { id: user.id };
    const token = generateToken(payload);

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "invalid password" });
    }

    user.password = newPassword;
    await user.save();

    console.log("password updated");
    res.status(200).json({ message: "password updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error " });
  }
};

module.exports = {
  signup,
  login,
  getProfile,
  updatePassword,
};
