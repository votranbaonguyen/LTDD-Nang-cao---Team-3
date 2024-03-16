const { model, Schema } = require('mongoose');

const checkoutSchema = new Schema({
    class: {
        type: Schema.ObjectId,
        ref: 'Class',
    },
    isProcessing: {
        type: Boolean,
        default: true,
    },
    day: {
        type: Date,
        default: new Date(),
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    teacherAddress: {
        type: String,
    },
    checkoutList: [
        {
            _id: false,
            student: {
                type: Schema.ObjectId,
                ref: 'User',
            },
            status: {
                type: String,
                enum: {
                    values: ['on-time', 'late', 'too far', 'non-check'],
                    message: "value are only: 'on-time', 'late', 'too far'",
                },
                default: 'non-check',
            },
            studentAddress: {
                type: String,
            },
        },
    ],
});

const checkoutModel = model('Checkout', checkoutSchema);

module.exports = {
    checkoutModel,
};
