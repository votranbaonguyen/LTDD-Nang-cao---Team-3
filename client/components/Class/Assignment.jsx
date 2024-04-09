import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Assignment = ({assignment,isSubmitted}) => {
    const {
        name,
        openTime,
        closeTime,
        summary
    } = assignment

    const isEnd = () => {
       return new Date(closeTime) < new Date()
    }

    return (
        <View style={styles.container}>
            <View style={styles.assignmentHeader}>
                <View>
                <MaterialIcons name="assignment" size={24} color={isEnd ? "gray" : "#64B5F6"} />
                {isSubmitted === true ?
                <Entypo
                name={'check'}
                size={20}
                color={'green'}
            />
            :<></>
                }
                
                </View>
                
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
                        <Text style={isEnd ? styles.lateStatus : {}}>{new Date(closeTime).toLocaleString()}</Text>
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
    },
    lateStatus: {
        color: "#d4380d"
    }
})