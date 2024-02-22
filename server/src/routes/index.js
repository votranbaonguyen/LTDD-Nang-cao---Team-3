const { Router } = require('express');
const { userRouter } = require('./userRouter.js');

const rootRouter = Router();
rootRouter.use('/user', userRouter);

module.exports = { rootRouter };
