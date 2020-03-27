const router = require('express').Router();
const controller = require('../../controllers/api/chat');
const { upload } = require('../../middlewares/uploadImage');

router.get('/', controller.get);
router.get('/:id', controller.getMessages);
router.post('/:id', upload().single('image'), controller.addMessage);

module.exports = router;
