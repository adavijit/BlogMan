<<<<<<< HEAD
const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/books", require("./books"));
router.use("/courses", require("./courses"));
router.use("/uploadContent", require("./uploadContent"));
=======
const router = require('express').Router();
const authenticator = require('../../middlewares/auth');

router.use('/users', require('./users'));
router.use('/books', require('./books'));
router.use('/courses', require('./courses'));
router.use('/chat', authenticator, require('./chat'));
>>>>>>> 140c0c17f8b592b8bf03e2fc67e416230931bb4a

module.exports = router;
