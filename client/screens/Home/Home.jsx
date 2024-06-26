import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Section from './Section';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllClassById,
    getAllStudentClassAssignment,
    getTodayClassList,
} from '../../redux/class/classSlice';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
import * as Notifications from 'expo-notifications';

import * as Location from 'expo-location';
import { updateUser } from '../../redux/user/userSlice';
import {
    registerForPushNotificationsAsync,
    schedulePushNotification,
} from '../../util/notification/notification';
import ClassAssignmentStatisDetail from '../../components/Class/ClassAssignmentStatisDetail';

const Home = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const { userInfo, loading } = useSelector((store) => store.userSlice);
    const { todayClassList, allClassList, assignmentStatis } = useSelector(
        (store) => store.classSlice
    );

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [activeNav, setActiveNav] = useState('one');

    const handleCheckout = () => {
        // const test = await getUserInfo();
        navigate.navigate('Checkout');
    };

    const handleChangeTab = (type) => {
        if (type === 'one') dispatch(getTodayClassList(userInfo));
        else if (type === 'all') dispatch(getAllClassById(userInfo));
        else dispatch(getAllStudentClassAssignment());
        setActiveNav(type);
    };

    //
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const renderClassList = () => {
        if (activeNav === 'one') {
            if (todayClassList?.length > 0) {
                return todayClassList.map((classDetail) => {
                    return (
                        <Section
                            time={`${classDetail.startTime} - ${classDetail.endTime}`}
                            room={classDetail.room}
                            isChecked={classDetail.isCheckToday}
                            teacher={'Bảo Nguyên'}
                            name={classDetail.name}
                            key={classDetail._id}
                            classId={classDetail._id}
                            isAllClass={false}
                        />
                    );
                });
            } else
                return (
                    <View style={styles.noClassContainer}>
                        <Text style={styles.noClassText}>No Class for today</Text>
                    </View>
                );
        } else if (activeNav === 'all') {
            if (allClassList?.length > 0) {
                return allClassList.map((classDetail) => {
                    return (
                        <Section
                            time={`${classDetail.startTime} - ${classDetail.endTime}`}
                            room={classDetail.room}
                            isChecked={classDetail.isCheckToday}
                            teacher={classDetail.teacher}
                            name={classDetail.name}
                            key={classDetail._id}
                            classId={classDetail._id}
                            isAllClass={true}
                        />
                    );
                });
            } else
                return (
                    <View style={styles.noClassContainer}>
                        <Text style={styles.noClassText}>You don't have any class</Text>
                    </View>
                );
        } else {
            if (assignmentStatis.length > 0) {
                return assignmentStatis.map((classData, index) => {
                    return <ClassAssignmentStatisDetail key={index} classData={classData} />;
                });
            } else
                return (
                    <View style={styles.noClassContainer}>
                        <Text style={styles.noClassText}>You don't have any assignment</Text>
                    </View>
                );
        }
    };

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotification(notification);
            }
        );

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log(response);
            }
        );

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        if (userInfo) {
            dispatch(getTodayClassList(userInfo));
            dispatch(getAllClassById(userInfo));
            registerForPushNotificationsAsync().then((token) =>
                dispatch(
                    updateUser({
                        userId: userInfo._id,
                        data: {
                            pushToken: token,
                        },
                    })
                )
            );
        }
    }, [userInfo]);
    return (
        <View style={styles.container}>
            <LoadingIndicator loading={loading} />
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <FontAwesome name='user' size={40} color='#0A426E' />
                </View>
                <Text style={styles.name}>{userInfo ? userInfo.name : ''}</Text>
            </View>
            <View style={styles.main}>
                <View
                    style={{
                        marginBottom: 25,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        flexDirection: 'row',
                    }}
                >
                    <Pressable
                        style={[
                            styles.topNavButton,
                            { borderRightWidth: 0.5, borderRightColor: '#ccc' },
                            activeNav === 'one' ? styles.activeNavButton : {},
                        ]}
                        onPress={() => handleChangeTab('one')}
                    >
                        <Text
                            style={[
                                { fontSize: 17, fontWeight: 'bold' },
                                activeNav === 'one' ? styles.activeNavButtonText : {},
                            ]}
                        >
                            Today's Class
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.topNavButton,
                            { borderLeftWidth: 0.5, borderLeftColor: '#ccc' },
                            ,
                            activeNav === 'all' ? styles.activeNavButton : {},
                        ]}
                        onPress={() => handleChangeTab('all')}
                    >
                        <Text
                            style={[
                                { fontSize: 17, fontWeight: 'bold' },
                                activeNav === 'all' ? styles.activeNavButtonText : {},
                            ]}
                        >
                            All Class
                        </Text>
                    </Pressable>
                    {userInfo?.role === 'student' ? (
                        <Pressable
                            style={[
                                styles.topNavButton,
                                { borderLeftWidth: 0.5, borderLeftColor: '#ccc' },
                                ,
                                activeNav === 'assignment' ? styles.activeNavButton : {},
                            ]}
                            onPress={() => handleChangeTab('assignment')}
                        >
                            <Text
                                style={[
                                    { fontSize: 17, fontWeight: 'bold' },
                                    activeNav === 'assignment' ? styles.activeNavButtonText : {},
                                ]}
                            >
                                Assignments
                            </Text>
                        </Pressable>
                    ) : (
                        <></>
                    )}
                </View>
                <ScrollView
                    style={{ flex: 1, marginBottom: 130 }}
                    showsVerticalScrollIndicator={false}
                >
                    {renderClassList()}
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                {/* <Pressable
                    onPress={handleLogout}
                    style={[styles.button, styles.mainButton, { marginBottom: 10 }]}
                >
                    <Text style={styles.mainButtonText}>LOG OUT</Text>
                </Pressable> */}
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
        flex: 1,
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

    topNavButton: {
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        paddingVertical: 12,
    },
    activeNavButton: {
        borderBottomColor: '#0A426E',
    },
    activeNavButtonText: {
        color: '#0A426E',
    },
    noClassContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    noClassText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ccc',
    },
});
