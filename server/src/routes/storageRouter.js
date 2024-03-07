const express = require('express');

//
const multer = require('multer');
const { authentication } = require('../middlewares/auth/authenticate');
const { uploadResource } = require('../controllers/storageController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const storageRouter = express.Router();
storageRouter.use(authentication);

storageRouter.route('/upload').post(upload.single('uploadFile'), uploadResource);

module.exports = { storageRouter };
