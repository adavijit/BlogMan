const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/books', require('./books'))
router.use('/courses', require('./courses'))

module.exports = router