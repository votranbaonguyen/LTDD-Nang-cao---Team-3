const { assignmentModel } = require('../models/assignmentModel');
const { classModel } = require('../models/classModel');
const { noticeModel } = require('../models/noticeModel');
const { sendNotice } = require('../service/notification');
const { CustomError } = require('../utils/CustomError');
const { deleteOne, getAll, getOne } = require('./crudController');

const createAssignment = async (req, res, next) => {
    try {
        const newDocument = new assignmentModel(req.body);
        await newDocument.save();

        const { classId } = req.body;
        if (!classId) return next(new CustomError('Please fill classId', 400));

        const classOfAssignment = await classModel
            .findById(classId)
            .lean()
            .populate('member');
        if (!classOfAssignment)
            return next(new CustomError('No class with this id', 404));

        const tokenList = [];
        const promises = classOfAssignment.member.map(async (mem) => {
            const newNotice = new noticeModel({
                user: mem._id,
                title: 'New assignment from your class',
                body: `Please go to class: ${classOfAssignment.name} to check`,
            });
            const temp = await newNotice.save();
            if (mem.pushToken) tokenList.push(mem.pushToken);
            return temp;
        });

        await Promise.all(promises);

        const message = {
            to: tokenList,
            title: 'New assignment',
            body: `You have new assginment in class: ${classOfAssignment.name}, please check your classs`,
        };

        const result = await sendNotice(message);

        if (result.status === 200) {
            return res.status(201).send({
                status: 'ok',
                data: newDocument,
            });
        }
        res.status(201).send({
            status: 'ok',
            data: newDocument,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};
const updateAssignment = async (req, res, next) => {
    try {
        const updateItem = await assignmentModel.findById(req.params.id);
        if (!updateItem) return next(new CustomError('No document with this id', 404));

        const updateField = req.body;
        if (Object.keys(updateField).includes('detail')) {
            const oldDetailList = updateItem.detail;
            const updateDetail = updateField.detail[0];
            let newDetailList = [];

            if (updateItem.closeTime < new Date(updateDetail.submitTime)) {
                updateDetail.status = 'late';
            } else {
                updateDetail.status = 'on-time';
            }

            if (updateDetail?._id) {
                newDetailList = oldDetailList.map((item) => {
                    if (updateDetail._id === item._id.toString()) {
                        return updateDetail;
                    }
                    return item;
                });
            } else {
                newDetailList = [...oldDetailList, updateDetail];
            }
            //
            // newDetail = updateField.detail.map((ele) => {
            //     if (ele.status != 'not-submit') {
            //         if (updateItem.closeTime < new Date(ele.submitTime)) {
            //             return { ...ele, status: 'late' };
            //         } else {
            //             return { ...ele, status: 'on-time' };
            //         }
            //     }
            //     return ele;
            // });
            updateField.detail = newDetailList;
        }
        const result = await assignmentModel.findByIdAndUpdate(
            req.params.id,
            updateField,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).send({
            status: 'ok',
            data: result,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};
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
