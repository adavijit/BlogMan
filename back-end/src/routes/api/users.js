const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  STATUS_OK,
  USER_NOT_FOUND,
  TOKEN_ERROR,
  INCORRECT_PASSWORD
} = require('../../utils/constants');

router.post("/login", async (req, res, next) => {
  let errors = {};
  const { username, password } = req.body.user;
  await User.findOne({ username }).then(user => {
    if (!user) {
      errors.user = USER_NOT_FOUND;
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.hash).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          username: user.username
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) console.error(TOKEN_ERROR, err);
            else {
              res.json({
                success: true,
                token
              });
            }
          }
        );
      } else {
        errors.password = INCORRECT_PASSWORD;
        return res.json(400).json(errors);
      }
    });
  });
});

router.post("/register", async (req, res) => {
  const { user } = req.body;
  const { username, password } = user;

  if (await User.findOne({ username })) {
    return res.json('Username "' + username + '" is already taken');
  }

  const newUser = new User(user);

  if (password) {
    newUser.hash = bcrypt.hashSync(user.password, 10);
  }

  await newUser.save(user).then((user, err) => {
    return res.json({ status: STATUS_OK, newUser: user });
  });
});

module.exports = router