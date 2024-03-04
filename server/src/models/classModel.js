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
            values: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
            ],
            message:
                "status are only: 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'",
        },
        default: 'on-time',
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

const classModel = model('Class', classSchema);
module.exports = {
    classModel,
};
