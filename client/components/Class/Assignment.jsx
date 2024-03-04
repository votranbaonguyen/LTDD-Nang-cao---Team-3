import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const Assignment = ({assignment}) => {
    const {
        name,
        openTime,
        closeTime,
        summary
    } = assignment
    return (
        <View style={styles.container}>
            <View style={styles.assignmentHeader}>
                <MaterialIcons name="assignment" size={24} color="#64B5F6" />
                <View style={styles.assignmentHeaderInfoContainer}>
                    <View>
                        <Text style={styles.assignmentName}>{name}</Text>
                    </View>
                    <View style={styles.assignmentTimeContainer}>
                        <Text style={styles.assignmentTimeTitle}>Opened: </Text>
                        <Text>{new Date(openTime).toLocaleString()}</Text>
                    </View>
                    <View style={styles.assignmentTimeContainer}>
                        <Text style={styles.assignmentTimeTitle}>Due: </Text>
                        <Text>{new Date(closeTime).toLocaleString()}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.assignmentDetailContainer}>
                <Text style={styles.assignmentDetailText}>
                {summary}
                </Text>
            </View>
        </View>
    )
}

export default Assignment

const styles = StyleSheet.create({
    container:{
        marginTop: 15,
        backgroundColor:"white",
        borderRadius: 5,
        elevation: 5,
        padding:10,
        marginHorizontal: 20
    },
    assignmentHeader:{
        flexDirection:"row"
    },
    assignmentHeaderInfoContainer: {
        marginLeft: 10
    },
    assignmentName:{
        fontSize: 16
    },
    assignmentTimeContainer:{
        flexDirection: "row",
        marginTop: 3
    },
    assignmentTimeTitle: {
        fontSize: 15,
        fontWeight:"bold"
    },
    assignmentDetailContainer: {
        marginTop: 10
    },
    assignmentDetailText: {
        fontSize: 15
    }
})