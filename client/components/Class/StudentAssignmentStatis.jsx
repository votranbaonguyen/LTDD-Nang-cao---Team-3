import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { useSelector } from 'react-redux';

const StudentAssignmentStatis = ({assignmentData,studentList}) => {
    const [statisType, setStatisType] = useState('on-time');
    const { studentStatisList } = useSelector(store => store.classSlice)


    const generateStudentStatisList = () => {
        return studentList.map((student) => {
            let index = assignmentData.detail.findIndex((studentAssignment) => studentAssignment.student._id === student._id)
            let status = index !== -1 ? assignmentData.detail[index].status : "Not submit"
            let statusTextStyle = {}
            if(status === "late") {
                status = "Late"
                statusTextStyle = styles.lateStatus
            }
            if(status === "on-time") {
                status = "On time"
                statusTextStyle = styles.onTimeStatus
            }
            return (
                <View key={student._id} style={styles.studentStatisContainer}>
                    <View style={[styles.studentStatisDetailContainer,{flex:3}]}>
                        <Text style={styles.studentStatisText}>{student.name}</Text>
                    </View>

                    <View style={[styles.studentStatisDetailContainer,{alignItems:"center"}]}>
                        <Text style={[styles.studentStatisText,statusTextStyle]}>{status}</Text>
                    </View>

                </View>
            )
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Student</Text>
                </View>

                <View style={{alignItems:'center',flex: 1}}>
                    <Text style={styles.headerTitle}>Status</Text>
                </View>
            </View>
            <View>
                {generateStudentStatisList()}
            </View>
        </View>
    )
}

export default StudentAssignmentStatis

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, 
        borderColor: "#ccc",
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 20,
        paddingTop: 10
    },
    headerContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: "center",
        marginBottom: 20
    },
    picker: {
        flex: 1
    },
    headerTitleContainer: {
        flex: 3
    },
    headerTitle: {
        color: "#b0aead",
        fontSize: 16
    },
    studentStatisContainer: {
        flex: 1,
        flexDirection: "row",

        marginBottom: 20,
        justifyContent: "space-between"
    },
    studentStatisDetailContainer: {
        flex: 1
    },
    studentStatisText:{
        fontWeight: "bold",
        fontSize: 14,
        color: "#44474d"
    },
    onTimeStatus: {
        color: "#5cb85c"
    },
    lateStatus: {
        color: "#d4380d"
    }
})