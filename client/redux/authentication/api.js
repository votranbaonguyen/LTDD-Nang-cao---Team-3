import { host } from '../../util/apiHost/apiHost';

export const authenticationAPI = {
    register: `${host}/user/register`,
    login: `${host}/user/login`,
    forgotPassword: `${host}/user/forgetpassword`,
    resetPassword: (userId) => `${host}/user/resetpassword/${userId}`,
    changePassword: () => `${host}/user/changepassword`,
};
