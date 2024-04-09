import { Pressable, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import Assignment from './Assignment'
import { AntDesign } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ClassAssignmentStatisDetail = ({ classData }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
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
    const renderAssignemnt = () => {

        return classData.assignmentList.map((assignment) => {
            let isSubmitted = findStudentAssignmentData(assignment)
            return <Pressable   key={assignment._id} onPress={() => navigate.navigate("AssignmentSubmit",{assignmentData: assignment, classId: classData.classId})}>
                <Assignment assignment={assignment} isSubmitted={isSubmitted}/>
            </Pressable>
        })
    }
    return (
        <View style={styles.container}>
            <Pressable style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => setIsCollapsed(!isCollapsed)}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{classData.className}</Text>
                <AntDesign name="down" size={20} color="black" />
            </Pressable>
            <Collapsible collapsed={isCollapsed}>
                <View style={{ paddingBottom: 20 }}>
                    {renderAssignemnt()}
                </View>
            </Collapsible>
        </View>
    )
}

export default ClassAssignmentStatisDetail

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginBottom: 20
    }
})