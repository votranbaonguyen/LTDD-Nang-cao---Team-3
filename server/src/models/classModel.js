const { Schema, model } = require('mongoose');

const classSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please fill class name'],
    },
    room: {
        type: String,
        default: 'A5-401',
    },
    startTime: {
        type: Number,
        default: 9,
    },
    endTime: {
        type: Number,
        default: 12,
    },
    section: [
        {
            name: {
                type: String,
                required: [true, 'Please fill section name'],
            },
            sectionDetail: {
                type: String,
                required: [true, 'Please fill section detail'],
            },
            documentUrl: {
                type: String,
                default: 'https://abc.com/image',
            },
            assignment: [
                {
                    type: Schema.ObjectId,
                    ref: 'Assignment',
                },
            ],
        },
    ],
    member: [
        {
            type: Schema.ObjectId,
            ref: 'User',
        },
    ],
    teacher: {
        type: Schema.ObjectId,
        ref: 'User',
    },
});

const classModel = model('Class', classSchema);
module.exports = {
    classModel,
};
