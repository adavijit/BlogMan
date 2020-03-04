const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  STATUS_OK,
  USER_NOT_FOUND,
  TOKEN_ERROR,
  INCORRECT_PASSWORD
} = require("../../utils/constants");

router.post("/login", async (req, res, next) => {
  let errors = {};
  const { username, password } = req.body;
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
  const { username, password, email, name, birth } = req.body;
  if (await User.findOne({ username })) {
    return res.json({ error: 'Username "' + username + '" is already taken' });
  }

  if (await User.findOne({ email })) {
    return res.json({ error: 'Email "' + email + '" is already taken' });
  }

  const newUser = new User({ username, email, name, birth: new Date(birth)  });

  if (password) {
    newUser.hash = bcrypt.hashSync(password, 10);
  }

  await newUser.save().then((user, err) => {
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

            return res.json({
              status: STATUS_OK,
              newUser: user,
              success: true,
              token
            });
          }
        );
      } else {
        errors.password = INCORRECT_PASSWORD;
        return res.json(400).json(errors);
      }
    });
  });
});

module.exports = router;
