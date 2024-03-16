const express = require('express');
const {
    createCheckout,
    updateCheckout,
    getAllCheckout,
    getOneCheckout,
    deleteCheckout,
    getCheckoutToday,
} = require('../controllers/checkoutController');
const { authentication } = require('../middlewares/auth/authenticate');

const checkoutRouter = express.Router();

// checkoutRouter.use(authentication);

checkoutRouter.route('/').post(createCheckout).get(getAllCheckout);
checkoutRouter.route('/today').get(getCheckoutToday);
checkoutRouter
    .route('/:id')
    .patch(updateCheckout)
    .get(getOneCheckout)
    .delete(deleteCheckout);

module.exports = {
    checkoutRouter,
};
