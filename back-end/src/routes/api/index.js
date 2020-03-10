const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/books", require("./books"));
router.use("/courses", require("./courses"));
router.use("/uploadContent", require("./uploadContent"));

module.exports = router;
