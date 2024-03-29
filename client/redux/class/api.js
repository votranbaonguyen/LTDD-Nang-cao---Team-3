import { host } from "../../util/apiHost/apiHost";

export const classAPI = {
    getOne: (classId) => `${host}/class/${classId}`,
    getAllTeacherClassByDate: (date,teacherId) => `${host}/class?dayOfWeek=${date}&teacher=${teacherId}`,
    getAllStudentClassByDate: (date,studentId) => `${host}/class?dayOfWeek=${date}&member[$in]=${studentId}`,
    getAllByTeacherId: (teacherId) => `${host}/class?teacher=${teacherId}`,
    getAllByStudentId: (studentId) => `${host}/class/student/${studentId}`,
    updateOneSection: (classId) => `${host}/class/${classId}`
}