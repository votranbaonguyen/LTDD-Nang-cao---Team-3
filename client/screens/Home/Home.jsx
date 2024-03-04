import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Section from './Section';
import { deleteUserInfo, getUserInfo } from '../../util/storage/userStorage';
import { BSON } from 'realm';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClassByTeacherId, getTodayClassList } from '../../redux/class/classSlice';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';

// const fake = {
//     _id: BSON.ObjectID('65d6ed58b07757a158cfeca0'),
//     name: 'thoty',
//     email: 'thoty@gmail.com',
//     accessToken: 'abcdef',
// };

const Home = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch()
    const {userInfo,loading} = useSelector(store => store.userSlice)
    const {todayClassList, allClassList} = useSelector(store => store.classSlice)

    const [activeNav,setActiveNav] = useState("one")

    const handleCheckout = async () => {
        const test = await getUserInfo();
        if (test) console.log(test);
    };
    const handleLogout = async () => {
        await deleteUserInfo();
        navigate.navigate('Login');
    };

    const handleChangeTab = (type) => {
        setActiveNav(type)
    }

    const renderClassList = () => {
        if(activeNav === 'one'){
            if(todayClassList.length > 0){
                return todayClassList.map((classDetail) => {
                    return <Section
                        time={`${classDetail.startTime} - ${classDetail.endTime}`}
                        room={classDetail.room}
                        isChecked={true}
                        teacher={'Bảo Nguyên'}
                        name={classDetail.name}
                        key={classDetail._id}
                        classId={classDetail._id}
                        isAllClass={false}
                    />
                })
            }else return <View style={styles.noClassContainer}>
                <Text style={styles.noClassText}>No Class for today</Text>
            </View>
           
        }else if(activeNav === 'all'){
            if(allClassList.length > 0){
                return allClassList.map((classDetail) => {
                    return <Section
                        time={`${classDetail.startTime} - ${classDetail.endTime}`}
                        room={classDetail.room}
                        isChecked={true}
                        teacher={classDetail.teacher}
                        name={classDetail.name}
                        key={classDetail._id}
                        classId={classDetail._id}
                        isAllClass={true}
                    />
                })
            }else return <View style={styles.noClassContainer}>
                <Text style={styles.noClassText}>You don't have any class</Text>
            </View>
           
        }
    }

    useEffect(() => {
        dispatch(getTodayClassList())
        dispatch(getAllClassByTeacherId())
    },[])

    return (
        <View style={styles.container}>
            <LoadingIndicator loading={loading} />
            <View style={styles.header}>
                <View style={styles.avatarContainer} >
                    <FontAwesome name='user' size={40} color='#0A426E' />
                </View>
                <Text style={styles.name}>{userInfo ? userInfo.name : ""}</Text>
            </View>
            <View style={styles.main}>
                <View
                    style={{
                        marginBottom: 25,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        flexDirection:"row",

                    }}
                >
                    <Pressable style={[styles.topNavButton,{borderRightWidth: .5, borderRightColor: "#ccc"},activeNav === "one" ? styles.activeNavButton : {}]} onPress={() => handleChangeTab("one")}>
                        <Text style={[{ fontSize: 17, fontWeight: 'bold' },activeNav === "one" ? styles.activeNavButtonText : {}]}>Today's Class</Text>
                    </Pressable>
                    <Pressable style={[styles.topNavButton,{borderLeftWidth: .5, borderLeftColor: "#ccc"}, ,activeNav === "all" ? styles.activeNavButton : {}]} onPress={() => handleChangeTab("all")}>
                        <Text style={[{ fontSize: 17, fontWeight: 'bold' },activeNav === "all" ? styles.activeNavButtonText : {}]}>All Class</Text>
                    </Pressable>
                </View>
                {renderClassList()}
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={handleLogout}
                    style={[styles.button, styles.mainButton, { marginBottom: 10 }]}
                >
                    <Text style={styles.mainButtonText}>LOG OUT</Text>
                </Pressable>
                <Pressable onPress={handleCheckout} style={[styles.button, styles.mainButton]}>
                    <Text style={styles.mainButtonText}>CHECKOUT</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0A426E',
        flex: 1,
        position: 'relative',
        top: 0,
        left: 0,
    },
    header: {
        paddingTop: 40,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 2,
    },
    main: {
        position: 'relative',
        top: 30,
        backgroundColor: 'white',
        height: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    buttonContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 30,
    },
    button: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
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
        letterSpacing: 3,
    },

    topNavButton:{
        flex: 1,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        paddingVertical: 12,
    },
    activeNavButton: {
        borderBottomColor: "#0A426E",
    },
    activeNavButtonText: {
        color: "#0A426E"
    },
    noClassContainer: {
        alignItems: "center",
        justifyContent:"center",
        paddingTop: 50
    },
    noClassText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#ccc"
    }
});
