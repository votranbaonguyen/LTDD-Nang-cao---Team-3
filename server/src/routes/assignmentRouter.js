const express = require('express');
const {
    createAssignment,
    updateAssignment,
    getAllAssignment,
    getOneAssignment,
    deleteAssignment,
} = require('../controllers/assignmentController');
const { authentication } = require('../middlewares/auth/authenticate');

const assignmentRouter = express.Router();

assignmentRouter.use(authentication);

assignmentRouter.route('/').post(createAssignment).get(getAllAssignment);
assignmentRouter
    .route('/:id')
    .patch(updateAssignment)
    .get(getOneAssignment)
    .delete(deleteAssignment);

module.exports = {
    assignmentRouter,
};
