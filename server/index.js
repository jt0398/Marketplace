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
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value. extended = true gives abilitiy to pass arrays and complex objects
app.use(helmet());

if (process.env.NODE_ENV === "production")
  app.use(express.static("client/build"));

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  appDebugger("Morgan enabled");
}

app.use(logger);

//Routes
app.use(routes);

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    dbDebugger("Connected to the database");
    app.listen(port, () => appDebugger(`App listening on port ${port}`));
  })
  .catch((err) => console.log(err));
