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
            _id: false,
            status: {
                type: String,
                enum: {
                    values: ['non-submit', 'submitted'],
                    message: "status are only: 'non-submit', 'submitted'",
                },
                default: 'non-submit',
            },
            student: {
                type: Schema.ObjectId,
                ref: 'User',
            },
            submitUrl: {
                type: String,
            },
        },
    ],
});

const assignmentModel = model('Assignment', assignmentSchema);
module.exports = {
    assignmentModel,
};
