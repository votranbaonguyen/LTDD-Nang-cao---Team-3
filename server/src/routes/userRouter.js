const express = require('express');
const userRouter = express.Router();
const {
    register,
    login,
    forgetPassword,
    resetPassword,
    changePassword,
} = require('../controllers/authController');
const { authentication } = require('../middlewares/auth/authenticate');

userRouter.route('/auth').get(authentication, (req, res) => {
    res.status(200).send({
        status: 'ok',
        message: 'This user is authenticated, token is not expired',
    });
});
userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/forgetpassword').post(forgetPassword);
userRouter.route('/resetpassword/:id').patch(resetPassword);
userRouter.route('/changepassword').patch(authentication, changePassword);

module.exports = { userRouter };
