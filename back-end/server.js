const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("error-handler");
const mongoose = require("mongoose");

require("./src/models/User");

mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === "production";

app.set("port", process.env.PORT || 5000);

require("dotenv").config();

app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URL_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB Connected Succesfully"));
mongoose.set("debug", true);

app.use(require("./src/routes"));

app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});
