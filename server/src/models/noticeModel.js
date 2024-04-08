const { Schema, model } = require('mongoose');

const noticeSchema = new Schema({
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
});

noticeSchema.pre(/^find/, function () {
    this.populate({ path: 'detail.student', select: '-password -role' });
});

const noticeModel = model('Notice', noticeSchema);
module.exports = {
    noticeModel,
};
