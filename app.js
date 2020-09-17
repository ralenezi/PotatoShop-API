const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const passport = require("passport");
const chalk = require("chalk");
const morgan = require("morgan");

// Routes
const cookieRoutes = require("./routes/cookies");
const bakeryRoutes = require("./routes/bakeries");
const userRoutes = require("./routes/users");

// Passport Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(cors());
app.use(bodyParser.json());

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(
  morgan(
    (tokens, req, res) =>
      `${chalk.blue(tokens.method(req, res))} ${chalk.green(
        tokens.url(req, res)
      )} ${chalk.red(tokens.status(req, res))}`
  )
);

// Routers
app.use("/cookies", cookieRoutes);
app.use("/bakeries", bakeryRoutes);
app.use(userRoutes);

const run = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

run();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
