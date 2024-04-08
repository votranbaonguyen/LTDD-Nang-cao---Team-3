const { Router } = require('express');
const { sendNotice, getAllNotice } = require('../controllers/notification');

const noticeRouter = Router();

noticeRouter.route('/').post(sendNotice).get(getAllNotice);

module.exports = {
    noticeRouter,
};
