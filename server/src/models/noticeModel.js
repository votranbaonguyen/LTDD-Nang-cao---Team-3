const { Schema, model } = require('mongoose');

const noticeSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'missing title of notification'],
        },
        body: {
            type: String,
            required: [true, 'missing body of notification'],
        },
    },
    { timestamps: true }
);

const noticeModel = model('Notice', noticeSchema);
module.exports = {
    noticeModel,
};
