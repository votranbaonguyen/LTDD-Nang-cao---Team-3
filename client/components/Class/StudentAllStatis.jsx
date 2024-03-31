import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useSelector } from 'react-redux';

const StudentAllStatis = () => {
    const [statisType, setStatisType] = useState('on-time');
    const { studentStatisList } = useSelector(store => store.classSlice)

    const generateStudentStatisList = () => {
        return studentStatisList.map((student) => {
            return (
                <View key={student._id} style={styles.studentStatisContainer}>
                    <View style={styles.studentStatisDetailContainer}>
                        <Text style={styles.studentStatisText}>{student.name}</Text>
                    </View>

                    <View style={[styles.studentStatisDetailContainer,{alignItems:"center"}]}>
                        <Text style={styles.studentStatisText}>{student.count[statisType]}</Text>
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

        <View style={[styles.picker]}>
            <Picker
                style={{ color: "#b0aead", fontWeight: "bold" }}

                selectedValue={statisType}
                onValueChange={(itemValue, itemIndex) => {
                    setStatisType(itemValue);
                }}

            >
                <Picker.Item label='On Time' value={'on-time'} />
                <Picker.Item label='Late' value={'late'} />
                <Picker.Item label='Not Submit' value={'not-submit'} />
            </Picker>
        </View>
    </View>
    <View>
        {generateStudentStatisList()}
    </View>
</View>
  )
}

export default StudentAllStatis

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, 
        borderColor: "#ccc",
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 20
    },
    headerContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: "center",

    },
    picker: {
        flex: 1
    },
    headerTitleContainer: {
        flex: 1
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
    }
})