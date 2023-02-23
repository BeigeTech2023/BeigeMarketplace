const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Add A Name"],
    unique: true,
    maxlength: [50, "Name cannot be over 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  role: {
    type: String,
    enum: ["photographer", "videographer", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please set your password"],
    select: false,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
