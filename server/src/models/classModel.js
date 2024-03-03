const { Schema, model } = require('mongoose');

const classSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please fill class name'],
    },
    section: [
        {
            _id: false,
            name: {
                type: String,
                required: [true, 'Please fill section name'],
            },
            sectionDetail: {
                type: String,
                required: [true, 'Please fill section detail'],
            },
            assignment: {
                type: Schema.ObjectId,
                ref: 'Assignment',
            },
        },
    ],
    member: [
        {
            type: Schema.ObjectId,
            ref: 'User',
        },
    ],
});

const classModel = model('Class', classSchema);
module.exports = {
    classModel,
};
