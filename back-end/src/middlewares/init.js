const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const addUser = require('./addUser');

module.exports = [
  cors(),
  morgan('dev'),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  addUser,
];
