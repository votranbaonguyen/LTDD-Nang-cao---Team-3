const axios = require('axios');
const { noticeModel } = require('../models/noticeModel');
const { User } = require('../models/userModel');
const crud = require('./crudController');

const getAllNotice = crud.getAll(noticeModel);

const sendNotice = async (req, res, next) => {
    try {
        const message = req.body.message;
        // const message = {
        //     to: 'ExponentPushToken[nGNCRKBcEt5a4oDJqzb0Ka]',
        //     title: 'Bao Nguyen',
        //     body: 'test body',
        // };

        const promises = message.map(async (item) => {
            const user = await User.findOne({ pushToken: item.to }).lean();

            if (user) {
                const newNotice = new noticeModel({
                    user: user._id,
                    title: item.title,
                    body: item.body,
                });
                const temp = await newNotice.save();
                return temp;
            }
        });
        await Promise.all(promises);

        const result = await axios({
            method: 'post',
            url: 'https://exp.host/--/api/v2/push/send',
            headers: {
                'Content-Type': 'application/json',
            },
            data: message,
        });
        if (result.status === 200) {
            return res.status(200).send({
                status: 'ok',
            });
        }
        res.status(200).send({
            status: 'ok',
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    sendNotice,
    getAllNotice,
};
