import multer, { FileFilterCallback } from 'multer';

const configs = {
  storage: multer.diskStorage({
    destination(req, fill, callback) {
      callback(null, 'images');
    },
    filename(req, file, callback) {
      callback(null, `${file.originalname}${new Date().getTime()}`);
    },
  }),

  fileFilter(req: any, file: any, callback: FileFilterCallback) {
    if (file.mimetype.includes('image')) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};

export const uploader = multer(configs);
