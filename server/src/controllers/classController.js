const { classModel } = require('../models/classModel');
const { ApiFeatures } = require('../utils/ApiFeature');
const { CustomError } = require('../utils/CustomError');
const { createOne, deleteOne, getAll, getOne, updateMany } = require('./crudController');

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
    { path: 'member' },
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

const getAssignmentStatis = async (req, res, next) => {
    try {
        const checkClass = await classModel
            .findById(req.params.id)
            .populate([{ path: 'member' }])
            .lean();
        if (!checkClass) return next(new CustomError('No document with this id', 404));
        let studentList = checkClass.member.map((mem) => {
            return { _id: mem._id, name: mem.name, assignment: [] };
        });
        let totalAssignment = 0;
        checkClass.section.forEach((sec) => {
            sec.assignment.forEach((assign) => {
                totalAssignment++;
                assign.detail.forEach((submit) => {
                    studentList.forEach((student) => {
                        if (student._id.toString() === submit.student._id.toString()) {
                            const submitOfStudent = {
                                ...submit,
                                assigmentName: assign.name,
                                assignmentId: assign._id,
                            };
                            student.assignment = [...student.assignment, submitOfStudent];
                        }
                    });
                });
            });
        });

        studentList = studentList.map((student) => {
            const count = {
                late: 0,
                'on-time': 0,
                'not-submit': 0,
                total: totalAssignment,
            };
            student.assignment.forEach((assign) => {
                count[assign.status]++;
            });
            count['not-submit'] = totalAssignment - count.late - count['on-time'];
            return { ...student, count: count };
        });

        res.status(200).send({
            status: 'ok',
            studentList,
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
    getAssignmentStatis,
};
