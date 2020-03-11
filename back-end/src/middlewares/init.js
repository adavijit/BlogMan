const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const addUser = require('./addUser');

module.exports = [
  cors(),
  morgan('dev'),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  addUser,
  cookieSession({
    name: 'session',
    keys: ['123'],
  }),
  cookieParser(),
];
