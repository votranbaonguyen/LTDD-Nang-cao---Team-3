const { classModel } = require('../models/classModel');
const { createOne, updateOne, deleteOne, getAll, getOne } = require('./crudController');

const createClass = createOne(classModel);
const updateClass = updateOne(classModel);
const getOneClass = getOne(classModel, [{ path: 'section.assignment' }]);
const getAllClass = getAll(classModel);
const deleteClass = deleteOne(classModel);

module.exports = {
    createClass,
    updateClass,
    getAllClass,
    getOneClass,
    deleteClass,
};
