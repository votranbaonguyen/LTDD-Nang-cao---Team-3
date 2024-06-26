const { classModel } = require('../models/classModel');
const { User } = require('../models/userModel');
const { CustomError } = require('../utils/CustomError');

const getStudentStatis = async (req, res, next) => {
    try {
        const allAttendClass = await classModel
            .find({ member: { $in: req.params.id } })
            .lean();

        const statisList = [];
        allAttendClass.forEach((item) => {
            let temp = {
                className: item.name,
                classId: item._id,
                assignmentList: [],
            };
            item.section.forEach((section) => {
                section.assignment.forEach((assign) => {
                    temp.assignmentList.push(assign);
                });
            });
            statisList.push(temp);
        });

        // const allSignmentOfStudent = await assignmentModel.find({
        //     'detail.student': req.params.id,
        // });
        res.status(200).send({
            status: 'ok',
            data: statisList,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (password)
            return next(new CustomError('You can not update password here', 400));
        const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(new CustomError('No document with this Id', 404));
        }

        res.status(200).send({
            status: 'ok',
            data: doc,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = { getStudentStatis, updateUser };
