import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StudentSubmittedAssignment = ({assignmentData, mainAssignmentId}) => {
    const navigate = useNavigation()
    const generateStatusText = () => {
        if(assignmentData !== null){
           if(assignmentData.status === 'on-time'){
                return <Text style={styles.onTimeStatus}>On Time</Text>
           }else if(assignmentData.status === 'late'){
                return <Text style={styles.lateStatus}>Late</Text>
           }
        }else return <Text>None</Text>
    }

    const generateTypesText = () => {
        if(assignmentData !== null){
           let typeList = []
           if(assignmentData.submitText) typeList.push("Text")
           if(assignmentData.submitUrl) typeList.push("File")
           return <Text>{typeList.join(", ")}</Text> 
        }else return <Text>None</Text>
    }
    return (
        <Pressable style={styles.studentSubmittedAssignment} onPress={() => navigate.navigate("SubmittedWork", {assignmentData, view:true, mainAssignmentId})}>
            <View style={styles.avatarContainer}>
                <FontAwesome name='user' size={30} color='white' />
            </View>
            <View style={styles.assignmentSubmittedContainer}>
                <View style={{ gap: 5 }}>
                    <Text style={styles.studentName}>{assignmentData.student.name}</Text>
                    <View style={styles.fileContainer}>
                        {generateTypesText()}
                    </View>
                </View>
                <View style={{ gap: 5, alignItems: "center" }}>
                    <Text style={styles.studentName}>Status</Text>
                    {generateStatusText()}
                </View>
            </View>
        </Pressable>
    )
}

export default StudentSubmittedAssignment

const styles = StyleSheet.create({
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#0A426E',
        backgroundColor: '#0A426E',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    studentSubmittedAssignment:{
        flexDirection: "row", 
        alignItems:"center",
        marginTop: 15
    },
    assignmentSubmittedContainer:{
        backgroundColor:"white",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection:"row",
        flex: 5,
        justifyContent: "space-between"
    },
    fileContainer: {
        flexDirection: "row",
        alignItems:"center",
        gap: 10
    },
    studentName: {
        fontSize:16,
        fontWeight: "bold",
    },
    onTimeStatus: {
        color: "#5cb85c"
    },
    lateStatus: {
        color: "#d4380d"
    }
})