const router = require("express").Router();
const controller = require("../../controllers/api/uploadContent");

router.post("/", controller.uploadContent);

module.exports = router;
