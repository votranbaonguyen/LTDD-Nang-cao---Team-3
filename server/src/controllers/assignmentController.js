const { assignmentModel } = require('../models/assignmentModel');
const { CustomError } = require('../utils/CustomError');
const { createOne, deleteOne, getAll, getOne } = require('./crudController');

const createAssignment = createOne(assignmentModel);
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
