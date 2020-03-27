const jwt = require('../utils/jwt');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    req.user = null;
    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1];
      const paylaod = jwt.verify(token);
      if (paylaod) {
        const id = paylaod.id;
        if (id) {
          req.user = await User.findById(id);
        }
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next();
    return;
  }
};
