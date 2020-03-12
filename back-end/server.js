const express = require('express');
const app = express();
<<<<<<< HEAD
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const errorHandler = require("error-handler");
const createError = require("http-errors");
const mongoose = require("mongoose");
const auth = require("./auth/auth");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

auth(passport);
app.use(passport.initialize());

require("./src/models/User");
require("./src/models/Blog");

=======
const errorHandler = require('error-handler');
const createError = require('http-errors');
const mongoose = require('mongoose');
const http = require('http');
const passport = require('passport');
const { socketInit } = require('./src/controllers/socket');
const initMiddleware = require('./src/middlewares/init');

require('./src/models/User');
require('./src/models/Blog');

>>>>>>> 140c0c17f8b592b8bf03e2fc67e416230931bb4a
mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

app.use(express.static('public'))
app.set("port", process.env.PORT || 5000);
require("dotenv").config();

<<<<<<< HEAD
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["123"]
  })
);
app.use(cookieParser());
=======
app.use(initMiddleware);
>>>>>>> 140c0c17f8b592b8bf03e2fc67e416230931bb4a

if (!isProduction) app.use(errorHandler);

mongoose.connect(
  process.env.MONGO_URL_LOCAL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
<<<<<<< HEAD
    useFindAndModify: false
  },
  error => {
    if (error) {
      console.log("Mongoose connection failed");
      throw error;
    }
    console.log("Mongoose connected");
  }
);
mongoose.set("debug", true);
=======
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      console.log('Mongoose connection failed');
      throw error;
    }
    console.log('Mongoose connected');
  },
);
mongoose.set('debug', true);
>>>>>>> 140c0c17f8b592b8bf03e2fc67e416230931bb4a

app.use(require('./src/routes'));

app.use('*', (req, res, next) => {
  next(new createError(404, 'Page not found.'));
});

app.use((error, req, res, next) => {
  if (error instanceof createError.HttpError) {
    const obj = {
      status: error.status,
      message: error.message,
    };
    if (error.errors) {
      obj.errors = error.errors;
    }
    res.status(error.status).json(obj);
  } else {
    console.log(error);
<<<<<<< HEAD
    res.status(500).json({ status: 500, message: "Server error." });
  }
});

app.get("/", (req, res) => {
  if (req.session.token) {
    res.cookie("token", req.session.token);
    res.json({
      status: "session cookie set"
    });
  } else {
    res.cookie("token", "");
    res.json({
      status: "session cookie not set"
    });
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
=======
    res.status(500).json({ status: 500, message: 'Server error.' });
  }
});

const server = http.createServer(app);
socketInit(server);
>>>>>>> 140c0c17f8b592b8bf03e2fc67e416230931bb4a

server.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
