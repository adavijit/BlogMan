const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join('public', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '_' + file.originalname);
    },
  });

  return multer({ storage, fileFilter });
};

module.exports = {
  upload,
};
