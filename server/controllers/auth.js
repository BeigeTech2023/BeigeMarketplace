const ErrorResponse = require("../middleware/errorHandling");
const User = require("../models/User");

// @Desc    Create a new user
// @route   POST api/v1/auth
// @Access  Private
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    const token = user.getSignedJwtToken();
    res.status(201).json({
      success: true,
      data: user,
      token,
    });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
};

// @Desc    Create a new user
// @route   POST api/v1/auth
// @Access  Private
exports.userLogin = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      data: "user has successfully logged in",
    });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
};
