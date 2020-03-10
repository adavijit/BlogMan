const createController = require("../createController");
const CreateContent = require("../../models/Content");

// Udemy arguments

module.exports = {
  uploadContent: createController(async (req, res, next) => {
    const { content: contentBody } = req.body;

    let content = await CreateContent.findOne({ name: contentBody.name });
    if (content)
      return res
        .status(500)
        .send({ err: "Use a different name for your content" });

    content = new CreateContent(contentBody);
    try {
      const result = await content.save();
      res.status(200).send({ content: result });
    } catch (error) {
      res.status(500).send({ err: "Transcation failed" });
    }
  })
};
