const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
// @Desc    Get all users
// @route   GET api/v1/users
// @Access  Public

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res
        .status(400)
        .json({ success: false, msg: "No uses found" });
    }
    res
      .status(200)
      .json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
};

// @Desc    Get a specific user
// @route   GET api/v1/users/:id
// @Access  Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.role = req.params.id;
      const err = new ErrorResponse(
        `Cannot find user`,
        404,
        "CastError",
        req.params.id
      );
      return next(err);
    }
    res.status(200).json({
      success: true,
      data: `You are getting this user ${req.params.id}`,
    });
  } catch (err) {
    //return res.status(404).json({ err: err });
    req.role = req.params.id;
    next(err);
  }
};

// @Desc    Create a new user
// @route   POST api/v1/users
// @Access  Private
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
};

// @Desc    Update a specific user
// @route   PUT api/v1/users/:id
// @Access  Private
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User does not exist" });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
};

// @Desc    Delete User
// @route   DELETE api/v1/users/:id
// @Access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User does not exist" });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
};
