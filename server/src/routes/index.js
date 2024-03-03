const { Router } = require('express');
const { userRouter } = require('./userRouter.js');
const { classRouter } = require('./classRouter.js');
const { assignmentRouter } = require('./assignmentRouter.js');

const rootRouter = Router();
rootRouter.use('/user', userRouter);
rootRouter.use('/class', classRouter);
rootRouter.use('/assignment', assignmentRouter);

module.exports = { rootRouter };
