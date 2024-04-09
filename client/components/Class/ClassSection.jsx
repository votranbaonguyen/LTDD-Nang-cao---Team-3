import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import DocumentFile from './DocumentFile';
import Assignment from './Assignment';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ClassSection = ({ sectionData, classId }) => {
    const navigate = useNavigation()
    const { userInfo } = useSelector((store) => store.userSlice);
    const findStudentAssignmentData = (assign) => {
        if(assign.detail){
            let index = assign.detail.findIndex((assignment) => assignment.student._id === userInfo._id)
            if(index !== -1){
                return true
            }else return false
        }else return false
      
    }
    const generateDocumentList = () => {
        if (sectionData)
            return sectionData.documentUrl.map((document, index) => {
                return <DocumentFile key={index} documentUrl={document} />
            })
    }

    const generateAssignmentList = () => {
        if (sectionData)
            return sectionData.assignment.map((assignment, index) => {
                let isSubmitted = false
                if(findStudentAssignmentData(assignment)) isSubmitted = true
                return <Pressable  key={index} onPress={() => navigate.navigate("AssignmentSubmit",{assignmentData: assignment, classId})}>
                    <Assignment assignment={assignment} isSubmitted={isSubmitted}/>
                </Pressable>
            })
    }

    

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.classDetailContainer}>
                    <Text style={styles.classDetailText}>
                        {sectionData ? sectionData.sectionDetail : ""}
                    </Text>
                </View>
                {generateDocumentList()}
                {generateAssignmentList()}
            </View>
        </ScrollView>
    )
}

export default ClassSection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50
    },
    classDetailContainer: {
        marginTop: 10,
        marginHorizontal: 20
    },
    classDetailText: {
        fontSize: 16
    }
})