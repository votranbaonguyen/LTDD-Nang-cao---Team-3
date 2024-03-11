import { host } from "../../util/apiHost/apiHost";

export const assignmentAPI = {
    updateOne: (assignmentId) => `${host}/assignment/${assignmentId}`,
    createOne: `${host}/assignment`
}