const { CustomError } = require('../utils/CustomError');
const { ApiFeatures } = require('../utils/ApiFeature');

const createOne = (Model) => async (req, res, next) => {
    try {
        const newDocument = new Model(req.body);
        await newDocument.save();
        res.status(201).send({
            status: 'ok',
            data: newDocument,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

const deleteOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new CustomError('No document with this Id', 404));
        }

        res.status(204).send({
            status: 'ok',
            data: doc,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

const updateOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(new CustomError('No document with this Id', 404));
        }

        res.status(200).send({
            status: 'ok',
            data: doc,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

const getOne = (Model, populateOptions) => async (req, res, next) => {
    try {
        let query = Model.findById(req.params.id);
        if (populateOptions) query.populate(populateOptions);
        const doc = await query;

        if (!doc) {
            return next(new CustomError('No document with this Id', 404));
        }
        res.status(200).send({
            status: 'ok',
            data: doc,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

const getAll = (Model) => async (req, res, next) => {
    try {
        const apiFeat = new ApiFeatures(Model.find(), req.query);
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
//
module.exports = {
    createOne,
    deleteOne,
    updateOne,
    getOne,
    getAll,
};
