/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAuthUser,
  getUser,
  updateUser,
  updateUserPassword,
  uploadFile,
} from '../controllers/userContoller';

// Image Upload
const imageStorage = multer.diskStorage({
  destination: 'images', // Destination to store image
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    // file.fieldname is name of the field (image), path.extname get the uploaded file extension
  },
});

const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'));
    }
    cb(undefined, true);
  },
});

const user = Router();

user.get('/', async (req, res) => {
  const response = await getUser(req);

  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

user.get('/auth', async (req, res) => {
  const response = await getAuthUser(req);

  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

user.post('/update', async (req, res) => {
  const response = await updateUser(req);

  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

user.post('/password-change', async (req, res) => {
  const response = await updateUserPassword(req);

  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

user.post('/upload-logo', upload.single('file'), async (req, res) => {
  const response = await uploadFile(req);

  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

export default user;
