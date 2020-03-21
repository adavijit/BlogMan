const { body } = require('express-validator');

module.exports = {
  register: [
    body('name')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('Name is required.'),
    body('username')
      .trim()
      .isString()
      .notEmpty({ ignore_whitespace: true })
      .withMessage('Username is required.')
      .isAlphanumeric()
      .withMessage('Username should be alphanumeric.'),
    body('birth')
      .trim()
      .isString()
      .optional(),
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is invalid.'),
    body('password')
      .trim()
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password should be minimun of 8 charecters.'),
  ],

  login: [
    body('username')
      .trim()
      .isString()
      .withMessage('Username is required.'),
    body('password')
      .trim()
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password should be minimun of 8 charecters.'),
  ],

  googleSignup: [
    body('token')
      .trim()
      .isString()
      .withMessage('Token is required.'),
    body('username')
      .trim()
      .isString()
      .withMessage('Username is required.'),
  ],

  googleLogin: [
    body('token')
      .trim()
      .isString()
      .withMessage('Token is required.'),
  ],
};
