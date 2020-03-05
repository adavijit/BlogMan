const router = require('express').Router();
const createError = require('http-errors');
const createController = require('../createController');
const User = require('../../models/User');
const authValidator = require('../../validators/auth');
const jwt = require('../../utils/jwt');
const { USER_NOT_FOUND, INCORRECT_PASSWORD } = require('../../utils/constants');

router.post(
  '/login',
  createController(
    async (req, res) => {
      const { username, password } = res.locals.inputBody;

      const user = await User.findOne({ username });
      if (!user)
        throw new createError(404, USER_NOT_FOUND, {
          errors: {
            username: USER_NOT_FOUND,
          },
        });
      const isMatch = await user.checkPassword(password);
      if (isMatch) {
        const token = await jwt.sign(user);
        res.status(200).json({
          token,
        });
      } else {
        throw new createError(401, INCORRECT_PASSWORD, {
          errors: { password: INCORRECT_PASSWORD },
        });
      }
    },
    {
      validation: {
        throwError: true,
        asObject: true,
        validators: [authValidator.login],
      },
      inputs: ['username', 'password'],
    },
  ),
);

router.post(
  '/register',
  createController(
    async (req, res) => {
      const body = res.locals.inputBody;

      if (body.birth) {
        body.birth = new Date(body.birth);
      }

      if (await User.findOne({ username: body.username })) {
        throw new createError(409, 'This username aleady exists.', {
          errors: {
            username: `Username '${body.username}' is already taken.'`,
          },
        });
      }

      if (await User.findOne({ email: body.email })) {
        throw new createError(409, 'This email aleady exists.', {
          errors: {
            email: `Email '${body.email}' is already taken.'`,
          },
        });
      }

      const newUser = new User(body);

      await newUser.save();

      const token = await jwt.sign(newUser);

      res.status(201).json({
        user: newUser,
        token,
      });
    },
    {
      validation: {
        throwError: true,
        asObject: true,
        validators: [authValidator.register],
      },
      inputs: ['name', 'username', ['password', 'hash'], 'email', 'birth'],
    },
  ),
);

module.exports = router;
