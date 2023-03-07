const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// Bring in route files
const users = require("./routes/users");
const auth = require("./routes/auth");
const CookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandling");
// Load config file
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

//body parser
app.use(express.json());
// Mount routers
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use(errorHandler);
app.use(CookieParser());
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
app.listen(
  PORT,
  console.log(`server is running in ${ENV} on ${PORT}`)
);
