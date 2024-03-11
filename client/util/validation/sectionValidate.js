export const validateSectionData = (sectionName, assignmentList) => {
    let error = {
        sectionName: false,
        assignmentErrorList: []
    }
    if(sectionName.length === 0) error.sectionName = true

    assignmentList.forEach((assignment,index) => {

        if(assignment._id){
            if(!assignment.removed)
                if(assignment.name !== undefined){
                    if(assignment.name.length === 0) error.assignmentErrorList.push(index)
                }
        }else {
            if(assignment.name !== undefined){
                if(assignment.name.length === 0) error.assignmentErrorList.push(index)
            }else error.assignmentErrorList.push(index)
        }
    })
    return error
}

export const sectionValidateErrorText = {
    MISS_SECTION_NAME: "You must enter a section name",
    MISS_ASSIGNMENT_NAME: "You must enter a assignment name",
}