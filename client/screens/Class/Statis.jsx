import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatisChart from '../../components/Class/StatisChart'
import { Picker } from '@react-native-picker/picker'
import StudentAssignmentStatis from '../../components/Class/StudentAssignmentStatis'
import { useSelector } from 'react-redux'
import StudentAllStatis from '../../components/Class/StudentAllStatis'

const Statis = ({ navigation, route }) => {
    const { assignmentList,studentList } = route.params
    const [selectedAssignment, setSelectedAssignment] = useState('0');
    const [selectedAssignmentData, setSelectedAssignmentData] = useState(null);
    const [chartData, setChartData] = useState([
        {
            value: 47,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
    ])
    const { studentStatisList } = useSelector(store => store.classSlice)

    const generateAssignmentSelectList = () => {
        let selectList = assignmentList.map((assignment) => {
            return <Picker.Item key={assignment._id} label={assignment.name} value={assignment._id} />
        })
        let allSelect = <Picker.Item key={'0'} label='All' value={'0'} />
        selectList = [allSelect, ...selectList]
        return selectList
    }
    const handleChangeValue = (itemValue, itemIndex) => {
        let index = assignmentList.findIndex((assignemnt) => assignemnt._id === itemValue)
        setSelectedAssignmentData(assignmentList[index])
        setSelectedAssignment(itemValue);
    }

    const generateChartDataForAllAssignment = () => {
        let lateCount = 0
        let onTime = 0
        let notSubmit = 0

        studentStatisList.forEach((student) => {
            let count = student.count
            lateCount += count['late']
            onTime += count['on-time']
            notSubmit += count['not-submit']
        })

        let sum = lateCount + onTime + notSubmit;

        // Tính phần trăm của mỗi số trên tổng
        let percentageLate = (lateCount / sum) * 100;
        let percentageOnTime = (onTime / sum) * 100;
        let percentageNotSubmit = (notSubmit / sum) * 100;

        setChartData([
            {
                value: percentageOnTime,
                color: '#009FFF',
                gradientCenterColor: '#006DFF',
                focused: true,
            },
            { value: percentageNotSubmit, color: '#828282', gradientCenterColor: '#828282' },
            { value: percentageLate, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
        ])

    }

    const generateChartDataForOneAssignment = () => {
        let lateCount = 0
        let onTime = 0
        let notSubmit = 0

        selectedAssignmentData.detail.forEach((studentAssignment) => {
            if(studentAssignment.status === 'late') lateCount++
            if(studentAssignment.status === 'on-time')  onTime++
        })

        studentList.forEach(student => {
            let index = selectedAssignmentData.detail.findIndex((studentAssignment) => studentAssignment.student._id === student._id)
            console.log(index)
            if(index === -1)
            notSubmit++
        })
       
        let sum = lateCount + onTime + notSubmit;
        
        // Tính phần trăm của mỗi số trên tổng
        let percentageLate = (lateCount / sum) * 100;
        let percentageOnTime = (onTime / sum) * 100;
        let percentageNotSubmit = (notSubmit / sum) * 100;

        setChartData([
            {
                value: percentageOnTime,
                color: '#009FFF',
                gradientCenterColor: '#006DFF',
                focused: true,
            },
            { value: percentageNotSubmit, color: '#828282', gradientCenterColor: '#828282' },
            { value: percentageLate, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
        ])

    }
    useEffect(() => {
        if (selectedAssignment === '0') {
            generateChartDataForAllAssignment()
        }else {
            generateChartDataForOneAssignment()
        }
    }, [studentStatisList, selectedAssignment])
    return (
        <ScrollView style={styles.container}>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedAssignment}
                    onValueChange={handleChangeValue}

                >
                    {generateAssignmentSelectList()}
                </Picker>
            </View>
            <StatisChart data={chartData} />
            {selectedAssignment === '0' ?
                <StudentAllStatis /> :
                <StudentAssignmentStatis assignmentData={selectedAssignmentData} studentList={studentList}/>
            }

        </ScrollView>
    )
}

export default Statis

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 20
    },
})