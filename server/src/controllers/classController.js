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
// const updateClass = updateOne(classModel);
const updateClass = async (req, res, next) => {
    try {
        const updateItem = await classModel.findById(req.params.id);
        if (!updateItem) return next(new CustomError('No document with this id', 404));

        const updateField = req.body;

        if (Object.keys(updateField).includes('section')) {
            const oldSectionArray = updateItem.section;
            const updateSection = updateField.section[0];
            let newSectionArray = [];
            if (updateSection?._id) {
                newSectionArray = oldSectionArray.map((ele) => {
                    if (updateSection._id === ele._id.toString()) {
                        return updateSection;
                    }
                    return ele;
                });
            } else {
                newSectionArray = [...oldSectionArray, updateSection];
            }
            updateField.section = newSectionArray;
        }

        const doc = await classModel.findByIdAndUpdate(req.params.id, updateField, {
            new: true,
            runValidators: true,
        });

        res.status(200).send({
            status: 'ok',
            data: doc,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};
const updateManyClass = updateMany(classModel);
const getOneClass = getOne(classModel, [
    { path: 'section.assignment' },
    { path: 'teacher' },
]);
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
