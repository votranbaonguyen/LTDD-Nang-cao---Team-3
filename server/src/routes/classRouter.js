const express = require('express');
const {
    createClass,
    updateClass,
    getAllClass,
    getOneClass,
    deleteClass,
    updateManyClass,
} = require('../controllers/classController');
const { authentication } = require('../middlewares/auth/authenticate');

const classRouter = express.Router();

classRouter.use(authentication);

classRouter.route('/').post(createClass).get(getAllClass);
classRouter.route('/many').patch(updateManyClass);
classRouter.route('/:id').patch(updateClass).get(getOneClass).delete(deleteClass);

module.exports = {
    classRouter,
};
