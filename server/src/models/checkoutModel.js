const { model, Schema } = require('mongoose');

const checkoutSchema = new Schema({
    class: {
        type: Schema.ObjectId,
        ref: 'Class',
    },
    status: {
        type: String,
        enum: {
            values: ['not-yet', 'processing', 'finish'],
            message: 'Invalid status of checkout',
        },
        default: 'student',
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
        type: Object,
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
                    values: ['on-time', 'late', 'too-far', 'non-check'],
                    message: "value are only: 'on-time', 'late', 'too far'",
                },
                default: 'non-check',
            },
            studentAddress: {
                type: Object,
            },
            time: {
                type: String,
            },
        },
    ],
});

//
checkoutSchema.pre(/^find/, function () {
    this.populate([{ path: 'checkoutList.student' }]);
});
const checkoutModel = model('Checkout', checkoutSchema);

module.exports = {
    checkoutModel,
};
