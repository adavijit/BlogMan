const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const errorHandler = require("error-handler");
const createError = require("http-errors");
const mongoose = require("mongoose");
const auth = require("./auth/auth");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

auth(passport);
app.use(passport.initialize());

require("./src/models/User");
require("./src/models/Blog");


mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === "production";

app.set("port", process.env.PORT || 5000);

require("dotenv").config();

app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));
app.use(cookieParser());

if (!isProduction) app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URL_CLOUD, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, (error) => {
  if(error) {
    console.log("Mongoose connection failed");
    throw error;
  }
  console.log('Mongoose connected')
});
mongoose.set("debug", true);

app.use(require("./src/routes"));

app.use("*", (req, res, next) => {
  next(new createError(404, "Page not found."));
});

app.use((error, req, res, next) => {
  if (error instanceof createError.HttpError) {
    const obj = {
      status: error.status,
      message: error.message
    };
    if (error.errors) {
      obj.errors = error.errors;
    }
    res.status(error.status).json(obj);
  } else {
    console.log(error);
    res.status(500).json({  status: 500, message: 'Server error.' });
  }
});



  


app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});
