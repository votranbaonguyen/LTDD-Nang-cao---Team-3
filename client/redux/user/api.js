import { host } from "../../util/apiHost/apiHost";

export const userAPI = {
    updateOne: (userId) => `${host}/user/${userId}`,
}