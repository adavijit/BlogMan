const router = require('express').Router();
const controller = require('../../controllers/api/users');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/google-signup', controller.googleSignup);
router.post('/google-login', controller.googleLogin);

module.exports = router;
