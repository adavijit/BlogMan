const router = require('express').Router();
const authenticator = require('../../middlewares/auth');

router.use('/users', require('./users'));
router.use('/books', require('./books'));
router.use('/courses', require('./courses'));
router.use('/chat', authenticator, require('./chat'));

module.exports = router;
