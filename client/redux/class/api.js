import { host } from "../../util/apiHost/apiHost";

export const classAPI = {
    getOne: (classId) => `${host}/class/${classId}`,
    getAllTeacherClassByDate: (date,teacherId) => `${host}/class?dayOfWeek=${date}&teacher=${teacherId}`,
    getAllStudentClassByDate: (date,studentId) => `${host}/class?dayOfWeek=${date}&member[$in]=${studentId}`,
    getAllByTeacherId: (teacherId) => `${host}/class?teacher=${teacherId}`,
    getAllByStudentId: (studentId) => `${host}/class/student/${studentId}`,
    updateOneSection: (classId) => `${host}/class/${classId}`,
    getClassStatis: (classId) => `${host}/class/${classId}/statis`,
    getStudentStatis: (studentId) => `${host}/user/${studentId}/statis`
}

export const commentAPI = {
    getAllByStudent: (classId,userId) => `${host}/comment?class=${classId}&user=${userId}`,
    getAllByClass: (classId) => `${host}/comment?class=${classId}`,
    sendComment: `${host}/comment`
}