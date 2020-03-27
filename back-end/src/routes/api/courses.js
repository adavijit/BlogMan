const router = require('express').Router();
const controller = require('../../controllers/api/courses');

router.get('/udemy', controller.udemy);
router.get('/youtube', controller.youtube);

module.exports = router;
