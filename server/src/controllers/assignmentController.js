const { assignmentModel } = require('../models/assignmentModel');
const { createOne, updateOne, deleteOne, getAll, getOne } = require('./crudController');

const createAssignment = createOne(assignmentModel);
const updateAssignment = updateOne(assignmentModel);
const getOneAssignment = getOne(assignmentModel, null);
const getAllAssignment = getAll(assignmentModel);
const deleteAssignment = deleteOne(assignmentModel);

module.exports = {
    createAssignment,
    updateAssignment,
    getAllAssignment,
    getOneAssignment,
    deleteAssignment,
};
