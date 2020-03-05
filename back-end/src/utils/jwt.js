const jwt = require('jsonwebtoken');

module.exports.sign = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        id: user._id,
        username: user.username,
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) {
            reject(err);
          }

          resolve(token);
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};
