const ErrorResponse = require("../utils/errorResponse");
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
    sendTokensInCookies(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @Desc    Create a new user
// @route   POST api/v1/auth
// @Access  Private
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      console.log("this");
      const err = new ErrorResponse(
        "Please enter your email and password",
        400
      );
      return next(err);
    }

    // Validate user
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return next(
        new ErrorResponse(
          "Invalid Credentials - no user found",
          401,
          "ValidationError"
        )
      );
    }

    const passwordMatched = await user.validatePassword(password);
    if (!passwordMatched) {
      return next(
        new ErrorResponse(
          "Invalid Credentials - password not matched",
          401,
          "ValidationError"
        )
      );
    }
    sendTokensInCookies(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// create cookies with token
const sendTokensInCookies = (user, statuscode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
