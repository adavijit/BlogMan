const router = require('express').Router();
const controller = require('../../controllers/api/books');

router.get('/books', controller.get);

module.exports = router;
