const express = require('express');
const app = express();
const errorHandler = require('error-handler');
const createError = require('http-errors');
const mongoose = require('mongoose');
const http = require('http');
const passport = require('passport');
const { socketInit } = require('./src/controllers/socket');
const initMiddleware = require('./src/middlewares/init');

require('./src/models/User');
require('./src/models/Blog');

mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

app.use(express.static('public'))
app.set("port", process.env.PORT || 5000);
require("dotenv").config();

app.use(initMiddleware);

if (!isProduction) app.use(errorHandler);

mongoose.connect(
  process.env.MONGO_URL_CLOUD,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
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
    res.status(500).json({ status: 500, message: 'Server error.' });
  }
});

const server = http.createServer(app);
socketInit(server);

server.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
