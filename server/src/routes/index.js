const { Router } = require('express');
const { userRouter } = require('./userRouter.js');
const { classRouter } = require('./classRouter.js');
const { assignmentRouter } = require('./assignmentRouter.js');
const { storageRouter } = require('./storageRouter.js');
const { checkoutRouter } = require('./checkoutRouter.js');

const rootRouter = Router();
rootRouter.use('/user', userRouter);
rootRouter.use('/class', classRouter);
rootRouter.use('/assignment', assignmentRouter);
rootRouter.use('/storage', storageRouter);
rootRouter.use('/checkout', checkoutRouter);

module.exports = { rootRouter };
