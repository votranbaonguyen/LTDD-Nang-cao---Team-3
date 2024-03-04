const { classModel } = require('../models/classModel');
const {
    createOne,
    updateOne,
    deleteOne,
    getAll,
    getOne,
    updateMany,
} = require('./crudController');

const createClass = createOne(classModel);
const updateClass = updateOne(classModel);
const updateManyClass = updateMany(classModel);
const getOneClass = getOne(classModel, [{ path: 'section.assignment' }]);
const getAllClass = getAll(classModel);
const deleteClass = deleteOne(classModel);

module.exports = {
    createClass,
    updateClass,
    getAllClass,
    getOneClass,
    deleteClass,
    updateManyClass,
};
