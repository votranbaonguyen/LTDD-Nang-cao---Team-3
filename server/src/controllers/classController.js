const { classModel } = require('../models/classModel');
const { ApiFeatures } = require('../utils/ApiFeature');
const { CustomError } = require('../utils/CustomError');
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

const getClassByStudentId = async (req, res, next) => {
    try {
        const modelQuery = classModel.find({ member: { $in: req.params.id } });

        const apiFeat = new ApiFeatures(modelQuery, req.query);
        apiFeat.filter().sorting().pagination();

        const docs = await apiFeat.myQuery;

        res.status(200).send({
            status: 'ok',
            total: docs.length,
            data: docs,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

module.exports = {
    createClass,
    updateClass,
    getAllClass,
    getOneClass,
    deleteClass,
    updateManyClass,
    getClassByStudentId,
};
