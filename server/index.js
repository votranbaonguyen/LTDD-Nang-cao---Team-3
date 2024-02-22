const express = require('express');
const dotenv = require('dotenv');

const { connectDatabase } = require('./src/configs/DBconfig');
const { CustomError } = require('./src/utils/CustomError');
const { errorHandler } = require('./src/middlewares/error/ErrorHandler');
const { rootRouter } = require('./src/routes/index');

// init
const app = express();
const port = 3000;
dotenv.config();

// config
app.use(express.json());
connectDatabase();

// main api endpoint
app.use('/api/test', (req, res) => {
    res.status(200).send({
        msg: 'ok',
    });
});
app.use('/api', rootRouter);

// all invalid route will cause error
app.all('*', (req, res, next) => {
    next(new CustomError(`Can't find this route`, 404));
});

// middleware use to handle error
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
