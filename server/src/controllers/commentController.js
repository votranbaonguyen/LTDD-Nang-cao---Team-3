const { classModel } = require('../models/classModel');
const { commentModel } = require('../models/commentModel');
const { noticeModel } = require('../models/noticeModel');
const { sendNotice } = require('../service/notification');
const crud = require('./crudController');

const createComment = async (req, res, next) => {
    try {
        const newDocument = new commentModel(req.body);
        await newDocument.save();

        const classOfComment = await classModel
            .findById(req.body.class)
            .select('member teacher name')
            .populate('member')
            .lean();

        let tokenList = [];
        tokenList.push(classOfComment.teacher._id);
        const message = {
            to: tokenList,
            title: 'New comment',
            body: `Class: ${classOfComment.name} has new comment, please check your classs`,
        };
        const result = await sendNotice(message);

        // send notice to teacher
        const newNotice = new noticeModel({
            user: classOfComment.teacher._id,
            title: 'New comment',
            body: `Class: ${classOfComment.name} has new comment, please check your classs`,
        });
        await newNotice.save();

        if (result.status === 200)
            return res.status(201).send({
                status: 'ok',
                data: newDocument,
            });

        res.status(201).send({
            status: 'ok',
            message: 'Send noti fail',
            data: newDocument,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
const updateComment = crud.updateOne(commentModel);
const getAllComment = crud.getAll(commentModel);
const getOneComment = crud.getOne(commentModel);
const deleteComment = crud.deleteOne(commentModel);

module.exports = {
    createComment,
    updateComment,
    getAllComment,
    deleteComment,
    getOneComment,
};
