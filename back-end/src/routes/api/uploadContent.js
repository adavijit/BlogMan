const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const controller = require("../../controllers/api/uploadContent");

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), controller.uploadContent);

module.exports = router;
