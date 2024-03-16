import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome,FontAwesome5 } from '@expo/vector-icons';
import StudentSubmittedAssignment from './StudentSubmittedAssignment';

const TeacherViewSubmitted = ({submittedList}) => {
    const navigate = useNavigation()
    const renderSubmittedAssignment = () => {
        if(submittedList.length > 0){
            return submittedList.map((assignment) => {
                return <StudentSubmittedAssignment assignmentData={assignment} key={assignment._id}/>
            })
        }else return <View>
            <Text style={styles.notSubmittedText}>
            Currently, no one has submitted their work
            </Text>
        </View>
       
    }
    return (
        <View style={styles.submittedContainer}>
            <Text style={styles.submittedTitle}>Submitted</Text>
            <View>
              {renderSubmittedAssignment()}
            </View>
        </View>
    )
}

export default TeacherViewSubmitted

const styles = StyleSheet.create({
    submittedContainer: {
        marginTop: 20
    },
    submittedTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    notSubmittedText: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "#ccc",
        marginTop: 100
    }
})