const axios = require('axios');
const { noticeModel } = require('../models/noticeModel');
const { User } = require('../models/userModel');

const sendNotice = async (req, res, next) => {
    try {
        const message = req.body.message;

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
        const final = await Promise.all(promises);

        const result = await axios({
            method: 'post',
            url: 'https://exp.host/--/api/v2/push/send',
            headers: {
                'Content-Type': 'application/json',
            },
            data: message,
        });
        res.status(200).send({
            status: 'ok',
            notification: result,
            data: final,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    sendNotice,
};
