const router = require('express').Router();
const controller = require('../../controllers/api/chat');

router.get('/', controller.get);
router.get('/:id', controller.getMessages);

module.exports = router;
