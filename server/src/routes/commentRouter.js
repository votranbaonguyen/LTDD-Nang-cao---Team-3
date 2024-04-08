const { Router } = require('express');
const {
    createComment,
    getAllComment,
    updateComment,
    getOneComment,
    deleteComment,
} = require('../controllers/commentController');

const commentRouter = Router();

commentRouter.route('/').post(createComment).get(getAllComment);
commentRouter.route('/:id').patch(updateComment).get(getOneComment).delete(deleteComment);

module.exports = { commentRouter };
