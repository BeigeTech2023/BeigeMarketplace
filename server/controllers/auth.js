// @Desc    Create a new user
// @route   POST api/v1/auth
// @Access  Private
exports.createUser = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      data: "You have successfullt created a new user",
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
