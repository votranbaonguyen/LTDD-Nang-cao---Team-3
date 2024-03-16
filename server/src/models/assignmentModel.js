const { Schema, model } = require('mongoose');

const assignmentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please fill assign name'],
    },
    openTime: {
        type: Date,
        required: [true, 'Please fill assign open time'],
    },
    closeTime: {
        type: Date,
        required: [true, 'Please fill assign close time'],
    },
    summary: {
        type: String,
        required: [true, 'Please fill assign summary'],
    },
    detail: [
        {
            submitTime: {
                type: Date,
                default: new Date(),
            },
            status: {
                type: String,
                enum: {
                    values: ['not-submit', 'on-time', 'late'],
                    message: "status are only:'not-submit', 'on-time', 'late'",
                },
                default: 'not-submit',
            },
            student: {
                type: Schema.ObjectId,
                ref: 'User',
            },
            submitText: {
                type: String,
                default: 'Here is my submit content',
            },
            submitUrl: {
                type: String,
                default: 'https://abc.com/image',
            },
        },
    ],
});

// middleware
// assignmentSchema.pre('findOneAndUpdate', function (next) {
//     const update = this.getUpdate();
//     if (!update.detail) return next(); // Kiểm tra xem trường 'detail' có được cập nhật không

//     const details = update.detail.map((ele) => {
//         if (this._update.closeTime > ele.submitTime) return { ...ele, status: 'late' };
//         return ele;
//     });

//     this.update({}, { $set: { detail: details } }); // Cập nhật lại trường 'detail'
//     next();
// });

const assignmentModel = model('Assignment', assignmentSchema);
module.exports = {
    assignmentModel,
};
