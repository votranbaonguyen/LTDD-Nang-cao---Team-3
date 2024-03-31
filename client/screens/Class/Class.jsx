import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import ClassSection from '../../components/Class/ClassSection';
import { useDispatch, useSelector } from 'react-redux';
import { getClassInfo, getClassStatis } from '../../redux/class/classSlice';
import EditSection from '../../components/Class/EditSection';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
import CreateSection from '../../components/Class/CreateSection';

const Class = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const [selectedSection, setSelectedSection] = useState();
    const [editing, setEditing] = useState(false);
    const [creating, setCreating] = useState(false);
    const { classInfo, loading } = useSelector((store) => store.classSlice);
    const [createEditLoading, setCreateEditLoading] = useState(false)
    const { userInfo } = useSelector((store) => store.userSlice);
    const generateSectionDropdown = () => {
        if (classInfo)
            return classInfo.section.map((section) => {
                return <Picker.Item key={section._id} label={section.name} value={section._id} />;
            });
    };

    const getSectionData = () => {
        if (classInfo) {
            let index = classInfo.section.findIndex((section) => section._id === selectedSection);
            return classInfo.section[index];
        } else return null;
    };

    const getAllAssigments = () => {
        if (classInfo) {
            let assignmentList = []
            classInfo.section.forEach((section) => {
                assignmentList = [...assignmentList, ...section.assignment]
            })
            return assignmentList
        } else return [];
    }
    const handleCancel = () => {
        setEditing(false);
        setCreating(false)
        dispatch(getClassInfo(route.params.classId));
    }

    const startLoading = () => {
        setCreateEditLoading(true)
    }
    const stopLoading = () => {
        setCreateEditLoading(false)
    }

    const handleViewStatis = () => {
        navigation.navigate("Statis",{assignmentList: getAllAssigments(), studentList:classInfo.member })

    }

    useEffect(() => {
        dispatch(getClassInfo(route.params.classId));
        dispatch(getClassStatis(route.params.classId));
    }, []);

    useEffect(() => {
        setSelectedSection(classInfo?.section[0]._id);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <LoadingIndicator loading={loading} />
            <LoadingIndicator loading={createEditLoading} />
            <Pressable style={styles.header} onPress={() => navigation.goBack()}>
                <Feather name='arrow-left' size={27} color='black' />
      
                <Text style={styles.headerText}>A2-301</Text>
                
            

            </Pressable>
            <View style={styles.body}>
                <View style={styles.classDetailContainer}>
                    <Text style={styles.className}>{classInfo?.name}</Text>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Text style={styles.classTime}>7:00 AM - 9:15 AM</Text>
                        <Pressable style={styles.viewStatis} onPress={handleViewStatis}>
                            <Text style={styles.viewStatisText}>View Statis</Text>
                            <AntDesign name="caretright" size={12} color="white" />
                        </Pressable>
                    </View>

                </View>
                <View style={styles.sectionDropdownContainer}>
                    <Text style={styles.sectionTitle}>{creating ? "Create New Section" : "Section"}</Text>
                    {creating ?
                        <></>
                        :
                        <View style={styles.picker}>

                            <Picker
                                selectedValue={selectedSection}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedSection(itemValue);
                                }}
                                enabled={editing ? false : true}
                            >
                                {generateSectionDropdown()}
                            </Picker>


                        </View>
                    }
                </View>
                {
                    creating ?
                        <CreateSection cancel={handleCancel} classId={route.params.classId} startLoading={startLoading} stopLoading={stopLoading} />
                        :
                        editing ?
                            <EditSection sectionData={getSectionData()} cancel={handleCancel} classId={route.params.classId} startLoading={startLoading} stopLoading={stopLoading} /> :
                            <ClassSection sectionData={getSectionData()} classId={route.params.classId} />
                }
                {
                    userInfo.role === "teacher" &&
                    (
                        <View style={styles.buttonContainer}>
                            {
                                editing || creating ?
                                    <>

                                    </>
                                    :
                                    <View style={styles.buttonContainer}>
                                        <Pressable style={[styles.button, styles.secondButton]} onPress={() => setCreating(true)}>
                                            <Text style={styles.secondButtonText}>CREATE</Text>
                                        </Pressable>
                                        <Pressable style={[styles.button, styles.mainButton]} onPress={() => setEditing(true)}>
                                            <Text style={styles.mainButtonText}>EDIT</Text>
                                        </Pressable>
                                    </View>
                            }

                        </View>
                    )
                }


            </View>

        </SafeAreaView>
    );
};

export default Class;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#5BA591',
    },
    header: {
        flex: 2,
        backgroundColor: '#5BA591',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        flex: 15,
        backgroundColor: '#EEF2F8',
        position: 'relative',
    },
    classDetailContainer: {
        backgroundColor: '#0A426E',
        position: 'absolute',
        width: '85%',
        alignSelf: 'center',
        height: 90,
        top: -45,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
    },
    className: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    classTime: {
        color: 'white',
    },
    sectionDropdownContainer: {
        marginTop: 55,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        paddingVertical: 12,
        flex: 1,
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
    buttonContainer: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        flexDirection: "row",
        gap: 10
    },
    secondButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
    },

    secondButtonText: {
        color: '#0A426E',
        fontSize: 15,
        fontWeight: 'bold',
    },
    viewStatis: {
        flexDirection: "row",
        alignItems: "center"
    },
    viewStatisText: {
        textDecorationLine: "underline",
        color:"white",
        fontWeight: 'bold',
    }
});
