const { checkoutModel } = require('../models/checkoutModel');
const { ApiFeatures } = require('../utils/ApiFeature');
const { CustomError } = require('../utils/CustomError');
const { createOne, deleteOne, getAll, getOne, updateOne } = require('./crudController');

const createCheckout = createOne(checkoutModel);
const updateCheckout = updateOne(checkoutModel);
const getOneCheckout = getOne(checkoutModel, null);
const getAllCheckout = getAll(checkoutModel);
const deleteCheckout = deleteOne(checkoutModel);

const getCheckoutToday = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const modelQuery = checkoutModel.find({ day: { $gte: today } });
        const apiFeat = new ApiFeatures(modelQuery, req.query);
        apiFeat.filter().sorting().pagination();

        const docs = await apiFeat.myQuery;

        res.status(200).send({
            status: 'ok',
            total: docs.length,
            data: docs,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

module.exports = {
    createCheckout,
    updateCheckout,
    getAllCheckout,
    getOneCheckout,
    deleteCheckout,
    getCheckoutToday,
};
