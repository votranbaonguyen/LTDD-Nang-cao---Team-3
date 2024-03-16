import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import TeacherViewSubmitted from '../../components/AssignmentSubmit/TeacherViewSubmitted';
import { useSelector } from 'react-redux';
import StudentSubmitField from '../../components/AssignmentSubmit/StudentSubmitField';

const AssigmentSubmit = ({ navigation, route }) => {
    const {
        _id,
        closeTime,
        openTime,
        name,
        detail
    } = route.params.assignmentData
    const { userInfo } = useSelector((store) => store.userSlice);

    const findStudentAssignmentData = () => {
        let index = detail.findIndex((assignment) => assignment.student._id === userInfo._id)
        if(index !== -1){
            return detail[index]
        }else return null
    }
    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.header} onPress={() => navigation.goBack()}>
                <Feather name='arrow-left' size={27} color='black' />
                <Text style={styles.headerText}>A2-301</Text>
            </Pressable>
            <View style={styles.body}>
                <View style={styles.detailContainer}>
                    <View style={styles.textDetailContainer}>
                        <Text style={styles.textTitle}>Assignment Name: </Text>
                        <Text style={{ fontSize: 14 }}>{name}</Text>
                    </View>
                    <View style={styles.textDetailContainer}>
                        <Text style={styles.textTitle}>Opened: </Text>
                        <Text style={{ fontSize: 14 }}>{new Date(openTime).toLocaleString()}</Text>
                    </View>
                    <View style={styles.textDetailContainer}>
                        <Text style={styles.textTitle}>Due: </Text>
                        <Text style={{ fontSize: 14 }}>{new Date(closeTime).toLocaleString()}</Text>
                    </View>
                </View>
                {
                    userInfo.role === "teacher" ?
                        <TeacherViewSubmitted submittedList={detail} /> :
                        <StudentSubmitField assignmentData={findStudentAssignmentData()} mainAssignmentId={_id} classId={route.params.classId}/>
                }

            </View>

        </SafeAreaView>
    )
}

export default AssigmentSubmit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#EEF2F8',
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
    body: {
        paddingHorizontal: 20,
        flex: 1,
        marginTop: 20
    },
    detailContainer: {
        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: "center",
        padding: 20,
        paddingBottom: 0,
        borderRadius: 5
    },
    textDetailContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    textTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#0A426E"
    },

})