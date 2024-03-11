import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { combineDateTime } from '../../util/DateTime/combineDateTime';
import { Entypo } from '@expo/vector-icons';
import { sectionValidateErrorText } from '../../util/validation/sectionValidate';

const EditAssignment = ({ assignment, isNew, updateFunc, index, removeFunc, isError }) => {
    const {
        name,
        openTime,
        closeTime,
        summary
    } = assignment
    const [assignmentName, setAssignmentName] = useState(name)
    const [openDate, setOpenDate] = useState(new Date(openTime))
    const [dueDate, setDueDate] = useState(new Date(closeTime))
    const [assignmentSumary, setAssignmentSumary] = useState(summary)

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [pickingDate, setPickingDate] = useState(new Date())
    const [pickingField, setPickingField] = useState("")

    const togglePicker = () => {
        setShowDatePicker(true)
    }

    const handleDatePick = (event, date) => {
        if (event.type === "dismissed") {
            setShowDatePicker(false)
        } else if (event.type === "set") {
            setPickingDate(date)
            setShowDatePicker(false)
            setTimeout(() => {
                setShowTimePicker(true)
            }, 100)
        }

    }
    const handleTimePick = (event, date) => {
        setShowTimePicker(false)
        if (event.type === "set") {
            const combinedDate = combineDateTime(pickingDate, date)
            if (pickingField === "open") {
                setOpenDate(combinedDate)
                updateFunc(assignment._id, "openTime", combinedDate.toISOString(), index)
            } else if (pickingField === "due") {
                setDueDate(combinedDate)
                updateFunc(assignment._id, "closeTime", combinedDate.toISOString(), index)
            }
        }

    }

    return (
        <View style={styles.container}>
            {showDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    onChange={handleDatePick}
                />
            )}
            {showTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    onChange={handleTimePick}
                    mode='time'
                />
            )}

            <View style={styles.assignmentHeader}>
                <MaterialIcons name="assignment" size={24} color="#64B5F6" />
                <View style={styles.assignmentHeaderInfoContainer}>
                    <View>
                        <Text style={styles.title}>
                            Assignment Name
                        </Text>
                        <TextInput
                            value={assignmentName}
                            style={[styles.input, isError ? styles.errorTextInput : null]}
                            placeholder='Assignment Name'
                            onChangeText={text => {
                                setAssignmentName(text)
                                updateFunc(assignment._id, "name", text, index)
                            }}
                        />
                        {isError ?
                            <Text style={{ color: "#d4380d", fontSize: 13 }}>**{sectionValidateErrorText.MISS_ASSIGNMENT_NAME}</Text>
                            :
                            <></>
                        }
                    </View>
                    <View style={styles.assignmentTimeContainer}>
                        <Text style={styles.assignmentTimeTitle}>Opened: </Text>
                        <TextInput value={openDate.toLocaleString()} style={[styles.input, { flex: 1 }]} placeholder='Opened Date' editable={false} />
                        <Pressable onPress={() => {
                            togglePicker()
                            setPickingField("open")
                        }}>
                            <AntDesign name="calendar" size={24} color="black" style={{ marginLeft: 10 }} />
                        </Pressable>
                    </View>
                    <View style={styles.assignmentTimeContainer}>
                        <Text style={styles.assignmentTimeTitle}>Due: </Text>
                        <TextInput value={dueDate.toLocaleString()} style={[styles.input, { flex: 1 }]} placeholder='Due Date' editable={false} />
                        <Pressable onPress={() => {
                            togglePicker()
                            setPickingField("due")
                        }}>
                            <AntDesign name="calendar" size={24} color="black" style={{ marginLeft: 10 }} />
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.assignmentDetailContainer}>
                <TextInput
                    value={assignmentSumary}

                    multiline={true}
                    numberOfLines={10}
                    textAlignVertical='top'
                    style={[styles.input, { height: 150 }]}
                    placeholder='Enter Assignment Detail'
                    onChangeText={text => {
                        setAssignmentSumary(text)
                        updateFunc(assignment._id, "summary", text, index)
                    }}
                />


            </View>
            <Pressable style={styles.removeAssignmentButton} onPress={() => removeFunc(assignment._id, index)}>
                <Entypo
                    name={'cross'}
                    size={20}
                    color={'#d4380d'}
                />
                <Text style={styles.removeAssignmentText}>
                    Remove Assignment
                </Text>
            </Pressable>
        </View>
    )
}

export default EditAssignment

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 5,
        padding: 10,
        marginHorizontal: 20
    },
    assignmentHeader: {
        flexDirection: "row"
    },
    assignmentHeaderInfoContainer: {
        marginLeft: 10,
        flex: 1
    },
    assignmentName: {
        fontSize: 16
    },
    assignmentTimeContainer: {
        flexDirection: "row",
        marginTop: 3,
        alignItems: "center",
    },
    assignmentTimeTitle: {
        fontSize: 15,
        fontWeight: "bold"
    },
    assignmentDetailContainer: {
        marginTop: 10
    },
    assignmentDetailText: {
        fontSize: 15
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 10
    },
    removeAssignmentButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff2e8",
        paddingVertical: 8,
        marginTop: 10,
        borderRadius: 5,
        borderColor: '#ffbb96',
        borderWidth: 1,
        flexDirection: "row"
    },
    removeAssignmentText: {
        color: "#d4380d",
        fontSize: 13
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    errorTextInput: {
        borderColor: "#d4380d"
    }
})