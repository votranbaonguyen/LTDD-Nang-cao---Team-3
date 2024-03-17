import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DocumentFile from '../../components/Class/DocumentFile';
import * as DocumentPicker from 'expo-document-picker';
import { uploadDocument } from '../../redux/document/documentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { studentSubmitAssignment } from '../../redux/assignment/assignmentSlice';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
import { getClassInfo } from '../../redux/class/classSlice';

const SubmittedWork = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const { assignmentData, mainAssignmentId, classId, view } = route.params
    const [submittedFile, setSubmittedFile] = useState(null)
    const [submittedText, setSubmittedText] = useState('')
    const { userInfo } = useSelector((store) => store.userSlice);
    const [loading, setLoading] = useState(false)

    const handleUploadFile = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync()
            setSubmittedFile(file.assets[0])
        } catch (e) {

        }
    }

    const generateSubmittedFile = () => {
        if (assignmentData) {
            if (submittedFile) {
                return <DocumentFile documentUrl={""} documentData={submittedFile} noMargin={true} editing={view ? false : true} />
            } else if (assignmentData.submitUrl) return <DocumentFile documentUrl={assignmentData.submitUrl} noMargin={true} editing={view ? false : true} />
        } else {
            if (submittedFile)
                return <DocumentFile documentUrl={""} documentData={submittedFile} noMargin={true} editing={view ? false : true} />
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (assignmentData !== null) {
            if (!assignmentData.submitUrl && !assignmentData.submitText) {
                ToastAndroid.show('Please add a File or Text to submit', ToastAndroid.LONG);
            } else {
                let submitAssignmentData = {
                    _id: assignmentData._id,
                    submitText: submittedText,
                    student: userInfo._id,
                    submitTime: new Date().toISOString()
                }
                if (submittedFile !== null) {
                    const formData = new FormData();
                    formData.append('uploadFile', {
                        uri: submittedFile.uri,
                        name: submittedFile.name,
                        type: submittedFile.mimeType
                    })
                    const uploadedRes = await dispatch(uploadDocument(formData))
                    submitAssignmentData['submitUrl'] = uploadedRes.payload.data.filePath
                }
                submitAssignmentData = {
                    detail: [
                        submitAssignmentData
                    ]
                }
                const a = await dispatch(studentSubmitAssignment({ assignmentId: mainAssignmentId, submitAssignmentData }))
                await dispatch(getClassInfo(classId))
                navigation.pop(2)
                ToastAndroid.show('Submit Success!!', ToastAndroid.LONG);
            }
        } else {
            if (submittedFile !== null || submittedText.length > 0) {
                let submitAssignmentData = {
                    submitText: submittedText,
                    student: userInfo._id,
                    submitTime: new Date().toISOString()
                }
                if (submittedFile !== null) {
                    const formData = new FormData();
                    formData.append('uploadFile', {
                        uri: submittedFile.uri,
                        name: submittedFile.name,
                        type: submittedFile.mimeType
                    })
                    const uploadedRes = await dispatch(uploadDocument(formData))
                    submitAssignmentData['submitUrl'] = uploadedRes.payload.data.filePath
                }
                submitAssignmentData = {
                    detail: [
                        submitAssignmentData
                    ]
                }
                const a = await dispatch(studentSubmitAssignment({ assignmentId: mainAssignmentId, submitAssignmentData }))
                await dispatch(getClassInfo(classId))
                navigation.pop(2)
                ToastAndroid.show('Submit Success!!', ToastAndroid.LONG);
            } else {
                ToastAndroid.show('Please add a File or Text to submit', ToastAndroid.LONG);
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        if (assignmentData) {
            if (assignmentData.submitText) setSubmittedText(assignmentData.submitText)
        }
    }, [route.params.assignmentData])

    return (
        <View style={styles.container}>
            <LoadingIndicator loading={loading} />
            <Pressable style={styles.header} onPress={() => navigation.goBack()}>
                <Feather name='arrow-left' size={27} color='black' />
                <Text style={styles.headerText}>Submit Assignment</Text>
            </Pressable>
            <ScrollView style={styles.body}>
                <View style={styles.submitFieldContainer}>
                    <Text style={styles.submitFieldTitle}>
                        Sumitted File
                    </Text>
                    {generateSubmittedFile()}
                    {!view ??
                        <Pressable style={styles.uploadButton} onPress={handleUploadFile}>
                            <FontAwesome5 name="upload" size={20} color="#ccc" />
                            <Text style={styles.uploadButtonText}>
                                Upload new Document
                            </Text>
                        </Pressable>
                    }

                </View>

                <View style={[styles.submitFieldContainer, { flex: 1 }]}>
                    <Text style={styles.submitFieldTitle}>
                        Sumitted Text
                    </Text>
                    <TextInput
                        value={submittedText}

                        multiline={true}
                        numberOfLines={20}
                        textAlignVertical='top'
                        style={[styles.input, { flex: 1 }]}
                        placeholder='Enter here...'
                        onChangeText={text => {
                            setSubmittedText(text)

                        }}
                    />
                </View>

            </ScrollView>
            {!view &&
                <Pressable style={[styles.button, styles.mainButton]} onPress={handleSubmit}>
                    <Text style={styles.mainButtonText}>SUBMIT</Text>
                </Pressable>
            }

        </View>
    )
}

export default SubmittedWork

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#EEF2F8',
        position: 'relative',
    },
    header: {
        backgroundColor: '#EEF2F8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    submitFieldContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    submitFieldTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#0A426E"
    },
    body: {
        flex: 1
    },
    uploadButton: {
        borderWidth: 2,
        borderColor: "#ccc",
        borderStyle: "dashed",

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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        marginTop: 10
    },
    button: {
        paddingVertical: 12,

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
        marginHorizontal: 20,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 30
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
})