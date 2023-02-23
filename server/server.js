const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// Bring in route files
const users = require("./routes/users");
const auth = require("./routes/auth");
// Load config file
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

//body parser
app.use(express.json());
// Mount routers
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
app.listen(
  PORT,
  console.log(`server is running in ${ENV} on ${PORT}`)
);
