import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React,{useEffect} from 'react'
import { Feather } from '@expo/vector-icons';
import LoadingIndicator from '../../util/Loading/LoadingIndicator'
import CommentInfo from '../../components/Class/CommentInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClassComment } from '../../redux/class/classSlice';

const AllComment = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const {classCommentList} = useSelector(store => store.classSlice)
    console.log(classCommentList)
    const renderComment = () => {
        return classCommentList.map((comment,index) => {
            return <CommentInfo comment={comment} key={index}/>
        })
    }

    useEffect(() => {
        dispatch(getAllClassComment(route.params.classId))
    },[route.params.classId])
  return (
    <View style={styles.container}>
    {/* <LoadingIndicator loading={loading} /> */}
    <Pressable style={styles.header} onPress={() => navigation.goBack()}>
        <Feather name='arrow-left' size={27} color='black' />
        <Text style={styles.headerText}>My Comment</Text>
    </Pressable>
    <ScrollView style={styles.body}>
        
        {renderComment()}
    </ScrollView>
        <Pressable style={[styles.button, styles.mainButton]} onPress={() => navigation.navigate("StudentComment", {classId: route.params.classId})}>
            <Text style={styles.mainButtonText}>ADD COMMENT</Text>
        </Pressable>


</View>
  )
}

export default AllComment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#EEF2F8',
        position: 'relative',
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
    submitFieldContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    submitFieldTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#0A426E"
    },
    body: {
        flex: 1,
        marginBottom:100,
        marginTop: 20
    },
    uploadButton: {
        borderWidth: 2,
        borderColor: "#ccc",
        borderStyle: "dashed",

        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 10,
        marginTop: 20
    },
    uploadButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#ccc"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        marginTop: 10
    },
    button: {
        paddingVertical: 12,

        alignItems: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 20,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 30
    },
    mainButton: {
        backgroundColor: '#0A426E',
        borderWidth: 1,
        borderColor: '#0A426E',
    },
    mainButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
})