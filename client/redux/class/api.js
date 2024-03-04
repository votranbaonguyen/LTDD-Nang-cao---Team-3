import { host } from "../../util/apiHost/apiHost";

export const classAPI = {
    getOne: (classId) => `${host}/class/${classId}`
}