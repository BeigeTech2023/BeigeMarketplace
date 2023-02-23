const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connect: ${conn.connection}`);
  } catch (err) {
    console.log(err.message);
  }
};
mongoose.set("strictQuery", true);
module.exports = connectDB;
