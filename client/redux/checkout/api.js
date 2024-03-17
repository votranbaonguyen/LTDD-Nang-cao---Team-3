import { host } from '../../util/apiHost/apiHost';

export const checkoutAPI = {
    create: `${host}/checkout`,
    update: (checkoutId) => `${host}/checkout/${checkoutId}`,
    getCurrent: (classId) => `${host}/checkout/today?class=${classId}`,
};
