const router = require('express').Router();
const controller = require('../../controllers/api/books');

router.post('/getBooks', controller.get);

module.exports = router;
