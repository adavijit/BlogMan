const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("error-handler");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === "production";

app.set("port", process.env.PORT || 3000);

require("dotenv").config();

app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) app.use(errorHandler);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Mongoose connected')
});
mongoose.set("debug", true);

require('./src/models/User')

app.use(require('./src/routes'))

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.statusCode || 500);

    res.json({
      errors: {
        message: err.statusMessage,
        error: err
      }
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: {
        err: statusMessage,
        error: {}
      }
    }
  });
});

app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});
