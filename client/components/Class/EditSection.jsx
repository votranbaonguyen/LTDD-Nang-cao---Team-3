import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentFile from './DocumentFile'
import Assignment from './Assignment'
import { FontAwesome5 } from '@expo/vector-icons';
import EditAssignment from './EditAssignment';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { sectionValidateErrorText, validateSectionData } from '../../util/validation/sectionValidate';
import { uploadDocument } from '../../redux/document/documentSlice';
import { createAssignment, updateOneAssignment } from '../../redux/assignment/assignmentSlice';
import { updateOneSection } from '../../redux/class/classSlice';

const EditSection = ({ sectionData, cancel, classId, startLoading, stopLoading }) => {
    const dispatch = useDispatch()
    const { uploadDocumentsList } = useSelector(store => store.classSlice)
    const [sectionName, setSectionName] = useState(sectionData.name)
    const [sectionDetail, setSectionDetail] = useState(sectionData.sectionDetail)
    const [newUploadedDocuments, setNewUploadedDocuments] = useState([])
    const [newAssignmentList, setNewAssignmentList] = useState([])
    const [updatedAssigmentList, setUpdatedAssigmentList] = useState([])
    const [error, setError] = useState({
        sectionName: false,
        assignmentErrorList: []
    })
    const addDocumentFile = (document) => {
        let tempDocumentList = [...newUploadedDocuments]
        tempDocumentList.push(document)
        setNewUploadedDocuments(tempDocumentList)
    }
    const removeNewDocumentFile = (documentIndex) => {
        let tempDocumentList = [...newUploadedDocuments]
        tempDocumentList.splice(documentIndex, 1)
        setNewUploadedDocuments(tempDocumentList)
    }

    const addAssignment = () => {
        let tempAssignmentList = [...newAssignmentList]
        let tempUpdatedAssignmentList = [...updatedAssigmentList]
        let newAssignment = {
            name: "",
            openTime: new Date(),
            closeTime: new Date(),
            summary: ""
        }
        tempAssignmentList.push(newAssignment)
        tempUpdatedAssignmentList.push({
            assignmentIndex: tempAssignmentList.length - 1,
            name: "",
            openTime: new Date().toISOString(),
            closeTime: new Date().toISOString(),
            summary: "",
        })
        setUpdatedAssigmentList(tempUpdatedAssignmentList)
        setNewAssignmentList(tempAssignmentList)
    }

    const updateAssignment = (assignmentId, fieldName, data, assignmentIndex) => {
        let index
        let tempUpdatedAssignmentList = [...updatedAssigmentList]
        if (assignmentId) {
            index = tempUpdatedAssignmentList.findIndex(assignment => assignment._id === assignmentId)
            if (index !== -1) {
                tempUpdatedAssignmentList[index][fieldName] = data
            } else {
                let tempAssignment = {}
                tempAssignment[fieldName] = data
                tempAssignment['_id'] = assignmentId
                tempUpdatedAssignmentList.push(tempAssignment)
            }
        } else {
            index = tempUpdatedAssignmentList.findIndex(assignment => assignment.assignmentIndex === assignmentIndex)
            if (index !== -1) {
                tempUpdatedAssignmentList[index][fieldName] = data
            } else {
                let tempAssignment = {}
                tempAssignment[fieldName] = data
                tempAssignment['assignmentIndex'] = assignmentIndex
                tempUpdatedAssignmentList.push(tempAssignment)
            }
        }
        setUpdatedAssigmentList(tempUpdatedAssignmentList)
    }

    const removeAssignment = (assignmentId, assignmentIndex) => {
        let index
        let tempUpdatedAssignmentList = [...updatedAssigmentList]
        if (assignmentId) {
            index = tempUpdatedAssignmentList.findIndex(assignment => assignment._id === assignmentId)
            if (index !== -1) {
                tempUpdatedAssignmentList[index]['removed'] = true
            } else {
                let tempAssignment = {}
                tempAssignment['removed'] = true
                tempAssignment['_id'] = assignmentId
                tempUpdatedAssignmentList.push(tempAssignment)
            }
        } else {
            index = tempUpdatedAssignmentList.findIndex(assignment => assignment.assignmentIndex === assignmentIndex)
            if (index !== -1) {
                tempUpdatedAssignmentList.splice(index, 1)
            }
            let tempAssignmentList = [...newAssignmentList]
            tempAssignmentList.splice(assignmentIndex, 1)
            setNewAssignmentList(tempAssignmentList)
        }
        setUpdatedAssigmentList(tempUpdatedAssignmentList)
    }

    const generateDocumentList = () => {
        if (sectionData)
            return sectionData.documentUrl.map((document, index) => {
                return <DocumentFile key={index} documentUrl={document} editing={true} index={index} sectionId={sectionData._id} />
            })
    }

    const generateNewDoucmentList = () => {
        return newUploadedDocuments.map((document, index) => {
            return <DocumentFile key={index} documentUrl={""} editing={true} documentData={document} index={index} removeFunc={removeNewDocumentFile} />
        })
    }

    const generateAssignmentList = () => {
        if (sectionData)
            return sectionData.assignment.map((assignment, index) => {
                let updatedIndex = updatedAssigmentList.findIndex(assignment => assignment._id === assignment._id)
                let isRemoved = false
                let isError = false

                if (updatedIndex !== -1) {
                    if (updatedAssigmentList[updatedIndex].removed !== undefined) isRemoved = true
                    if (error.assignmentErrorList.includes(updatedIndex)) isError = true
                }

                if (isRemoved) return <View key={index}></View>
                else {
                    return <EditAssignment key={index} assignment={assignment} isNew={false} updateFunc={updateAssignment} index={index} removeFunc={removeAssignment} isError={isError} />
                }
            })
    }

    const generateNewAssignmentList = () => {
        return newAssignmentList.map((assignment, index) => {
            let updatedIndex = updatedAssigmentList.findIndex(assignment => assignment.assignmentIndex === assignment.index)
            let isError = false
            if (updatedIndex !== -1) {
                if (error.assignmentErrorList.includes(updatedIndex)) isError = true
            }
            return <EditAssignment key={index} assignment={assignment} isNew={true} updateFunc={updateAssignment} index={index} removeFunc={removeAssignment} isError={isError} />
        })
    }

    const handleUploadFile = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync()
            addDocumentFile(file.assets[0])
        } catch (error) {
            
        }
      

    }

    const handleSubmit = async () => {
        const validateError = validateSectionData(sectionName, updatedAssigmentList)
        if (validateError.assignmentErrorList.length === 0 && validateError.sectionName === false) {
            startLoading()
            let newSectionData = {
                name: sectionData.name,
                sectionDetail: sectionData.sectionDetail,
                documentUrl: [...sectionData.documentUrl],
                assignment: [...sectionData.assignment],
                _id: sectionData._id
            }
            newSectionData.name = sectionName
            newSectionData.sectionDetail = sectionDetail

            for (let i = 0; i < newUploadedDocuments.length; i++) {
                const newDocument = newUploadedDocuments[i];
                const formData = new FormData();
                formData.append('uploadFile', {
                    uri: newDocument.uri,
                    name: newDocument.name,
                    type: newDocument.mimeType
                })
                const uploadedRes = await dispatch(uploadDocument(formData))
                newSectionData.documentUrl.push(uploadedRes.payload.data.filePath)
            }

            for (let i = 0; i < updatedAssigmentList.length; i++) {
                const assignment = updatedAssigmentList[i];
                console.log(assignment)
                if (assignment._id) {
                    let updateData = {
                        ...assignment
                    }
                    delete updateData._id
                    await dispatch(updateOneAssignment({ assignmentId: assignment._id, data: updateData }))
                } else {
                    let createData = {
                        ...assignment,
                        classId
                    }
                    delete createData.assignmentIndex
                 
                    const assignmentRes = await dispatch(createAssignment(createData))
                    newSectionData.assignment.push(assignmentRes.payload.data._id)
                }
            }

            await dispatch(updateOneSection({classId: classId, data: {
                section: [newSectionData]
            }}))
            stopLoading()
            cancel()

        } else setError(validateError)
    }



    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.classDetailContainer}>
                    <Text style={styles.title}>
                        Section Name
                    </Text>
                    <TextInput value={sectionName} style={[styles.input, error.sectionName ? styles.errorTextInput : null]} placeholder='Enter section name' onChangeText={(text) => setSectionName(text)} />
                    {error.sectionName ?
                        <Text style={{ color: "#d4380d" }}>**{sectionValidateErrorText.MISS_SECTION_NAME}</Text>
                        :
                        <></>
                    }
                </View>
                <View style={styles.classDetailContainer}>
                    <Text style={styles.title}>
                        Section Detail
                    </Text>
                    <TextInput value={sectionDetail} multiline={true} numberOfLines={10} textAlignVertical='top' style={[styles.input, { height: 150 }]} placeholder='Enter section name' onChangeText={(text) => setSectionDetail(text)} />

                </View>
                {generateDocumentList()}
                {generateNewDoucmentList()}
                <Pressable style={styles.uploadButton} onPress={handleUploadFile}>
                    <FontAwesome5 name="upload" size={20} color="#ccc" />
                    <Text style={styles.uploadButtonText}>
                        Upload new Document
                    </Text>
                </Pressable>
                {generateAssignmentList()}
                {generateNewAssignmentList()}
                <Pressable style={styles.uploadButton} onPress={addAssignment}>
                    <FontAwesome5 name="plus" size={18} color="#ccc" />
                    <Text style={styles.uploadButtonText}>
                        Add new Assignment
                    </Text>
                </Pressable>
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.secondButton]} onPress={cancel}>
                        <Text style={styles.secondButtonText}>CANCEL</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.mainButton]} onPress={handleSubmit}>
                        <Text style={styles.mainButtonText}>SAVE</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

export default EditSection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 100,
        position: "relative"
    },
    classDetailContainer: {
        marginTop: 10,
        marginHorizontal: 20
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    uploadButton: {
        borderWidth: 2,
        borderColor: "#ccc",
        borderStyle: "dashed",
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 10,
        marginTop: 20
    },
    uploadButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#ccc"
    },
    button: {
        paddingVertical: 12,
        flex: 1,
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    mainButton: {
        backgroundColor: '#0A426E',
        borderWidth: 1,
        borderColor: '#0A426E',
    },
    mainButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        flexDirection: "row",
        gap: 10
    },
    secondButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
    },

    secondButtonText: {
        color: '#0A426E',
        fontSize: 15,
        fontWeight: 'bold',
    },

    errorTextInput: {
        borderColor: "#d4380d"
    }
})