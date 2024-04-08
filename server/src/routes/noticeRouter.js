const { Router } = require('express');
const { sendNotice } = require('../controllers/notification');

const noticeRouter = Router();

noticeRouter.route('/').post(sendNotice);

module.exports = {
    noticeRouter,
};
