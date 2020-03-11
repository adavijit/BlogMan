const createError = require('http-errors');

module.exports = async (req, res, next) => {
  if (req.user && req.user.id) {
    next();
  } else {
    next(new createError(401, 'Unauthorized user.'));
  }
};
