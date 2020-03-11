const createController = require("../createController");
const CreateContent = require("../../models/Content");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRETKEY
});

const uploadParams = {
  Bucket: process.env.AWS_S3_BUCKET,
  Key: null,
  Body: null,
  ACL: "public-read"
};

module.exports = {
  uploadContent: createController(async (req, res, next) => {
    const contentBody = req.body.content; // Catch content metadata like name, tags, domain etc
    const params = uploadParams;
    uploadParams.Key =
      Date.now() + "-" + req.file.originalname.toLowerCase().replace(/\s/g, ""); // name for video file
    uploadParams.Body = req.file.buffer; // Video buffer

    let content = await CreateContent.findOne({ name: contentBody.name });
    if (content)
      return res
        .status(500)
        .send({ err: "Use a different name for your content" });

    await new AWS.S3()
      .putObject(params)
      .promise()
      .then(async () => {
        contentBody.link = process.env.AWS_S3_BUCKET_LINK + params.Key;
        content = new CreateContent(contentBody);
        await content
          .save()
          .then(data => res.status(200).send({ data: data }))
          .catch(err => res.status(500).send({ error: err }));
      })
      .catch(err => res.send({ error: err }));
  })
};
