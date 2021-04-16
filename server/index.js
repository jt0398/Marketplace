require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const appDebugger = require("Debug")("app:startup");
const dbDebugger = require("Debug")("app:db");
const express = require("express");
const app = express();
const Joi = require("joi"); //Joi is a class
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value. extended = true gives abilitiy to pass arrays and complex objects
app.use(express.static("public"));
app.use(helmet());

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  appDebugger("Morgan enabled");
}

app.use(logger);

dbDebugger("Connected to the database");

//Routes
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => appDebugger(`Listening on port ${port}`));
