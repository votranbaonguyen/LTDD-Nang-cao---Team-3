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
    dayOfWeek: {
        type: String,
        enum: {
            values: [0, 1, 2, 3, 4, 5, 6],
            message: 'day week is only from 0 to 6',
        },
        default: 0,
    },
    startDay: {
        type: Date,
        default: new Date('2024-01-01'),
    },
    startTime: {
        type: String,
        default: '9:15',
    },
    endTime: {
        type: String,
        default: '16:20',
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
            documentUrl: [
                {
                    type: String,
                    default: 'https://abc.com/image',
                },
            ],
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

// middlewares
classSchema.pre(/^find/, function (next) {
    this.populate([
        { path: 'section.assignment' },
        { path: 'teacher', select: '-password -passwordChangedAt' },
    ]);

    next();
});

const classModel = model('Class', classSchema);
module.exports = {
    classModel,
};
