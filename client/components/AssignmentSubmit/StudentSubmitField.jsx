import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const StudentSubmitField = ({assignmentData,mainAssignmentId, classId}) => {
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
    // const generateMainText = () => {
    
    // }

    return (
        <Pressable style={styles.container} onPress={() => navigate.navigate("SubmittedWork", {assignmentData,mainAssignmentId, classId,view:false})}>
            <View style={styles.textDataContainer}>
                <Text style={styles.textDataTitle}>Submitted Status: </Text>
                {generateStatusText()}
            </View>
            <View style={styles.textDataContainer}>
                <Text style={styles.textDataTitle}>Sumitted Types: </Text>
                {generateTypesText()}
            </View>
            <View>
                <Text style={styles.mainText}>Press here to update your assignment</Text>
            </View>
        </Pressable>
    )
}

export default StudentSubmitField

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: "gray",
        borderStyle:"dashed",
        alignItems:"center",
        justifyContent:"center",
        paddingVertical: 20,
        gap: 10
    },
    textDataContainer: {
        flexDirection: "row",
    },
    textDataTitle: {
        fontSize: 15,
        fontWeight: "bold"
    },
    mainText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ccc",
        textAlign: "center"
    },
    onTimeStatus: {
        color: "#5cb85c"
    },
    lateStatus: {
        color: "#d4380d"
    }
})