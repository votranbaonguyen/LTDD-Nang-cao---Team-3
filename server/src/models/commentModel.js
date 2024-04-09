const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            ref: 'User',
        },
        class: {
            type: Schema.ObjectId,
            ref: 'Class',
        },
        content: {
            type: String,
            required: [true, 'Missing content of comments'],
        },
    },
    { timestamps: true }
);

commentSchema.pre(/^find/, function () {
    this.populate({ path: 'user', select: '_id name email' });
});

const commentModel = model('Comment', commentSchema);
module.exports = {
    commentModel,
};
