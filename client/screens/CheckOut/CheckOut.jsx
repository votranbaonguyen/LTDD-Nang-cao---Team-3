import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getClassInfo } from '../../redux/class/classSlice';
import {
    createCheckout,
    updateCheckout,
    getCheckoutByClass,
} from '../../redux/checkout/checkoutSlice';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
import { getUserInfo } from '../../util/storage/userStorage';
import CheckOutStatistic from './CheckOutStatistic';
import * as Location from 'expo-location';
import { calculateDistance } from '../../util/helper/location';

export default function CheckOut() {
    const dispatch = useDispatch();
    const {
        todayClassList,
        loading: loadingClass,
        classInfo,
    } = useSelector((store) => store.classSlice);
    const [user, setUser] = useState(null);
    let loadingUser = false;
    const { loading: loadingCheckout, checkoutInfo } = useSelector((store) => store.checkoutSlice);

    const [selectClassId, setSelectClassId] = useState(null);
    const [isCheck, setIsCheck] = useState(false);

    const renderCheckoutButton = () => {
        if (checkoutInfo?.status === 'processing' && user?.role === 'teacher')
            return (
                <Pressable
                    onPress={handleCloseCheckout}
                    disabled={loadingClass || loadingCheckout || loadingUser}
                    style={[styles.button, styles.mainButton, { backgroundColor: 'red' }]}
                >
                    <Text style={styles.mainButtonText}>STOP CHECKOUT</Text>
                </Pressable>
            );
        else if (checkoutInfo?.status === 'finish' && user?.role === 'teacher')
            return (
                <Pressable
                    onPress={handleOpenCheckout}
                    disabled={loadingClass || loadingCheckout || loadingUser}
                    style={[styles.button, styles.mainButton, { backgroundColor: 'gray' }]}
                >
                    <Text style={styles.mainButtonText}>CHECKOUT FINISHED</Text>
                </Pressable>
            );
        else if (user?.role === 'teacher')
            return (
                <Pressable
                    onPress={handleOpenCheckout}
                    disabled={loadingClass || loadingCheckout || loadingUser}
                    style={[styles.button, styles.mainButton]}
                >
                    <Text style={styles.mainButtonText}>START CHECKOUT</Text>
                </Pressable>
            );
        else if (
            checkoutInfo?.status === 'processing' &&
            user?.role === 'student' &&
            isCheck === false
        )
            return (
                <Pressable
                    onPress={() => handleCheckout(user._id)}
                    disabled={loadingClass || loadingCheckout || loadingUser}
                    style={[styles.button, styles.mainButton]}
                >
                    <Text style={styles.mainButtonText}>CHECKOUT NOW</Text>
                </Pressable>
            );
        else if (
            checkoutInfo?.status === 'processing' &&
            user?.role === 'student' &&
            isCheck === true
        )
            return (
                <Pressable
                    onPress={() => handleCheckout(user._id)}
                    disabled={loadingClass || loadingCheckout || loadingUser}
                    style={[styles.button, styles.mainButton, { backgroundColor: 'gray' }]}
                >
                    <Text style={styles.mainButtonText}>CHECKED</Text>
                </Pressable>
            );
        else
            return (
                <Pressable
                    disabled={loadingClass || loadingCheckout || loadingUser}
                    style={[styles.button, styles.mainButton, { backgroundColor: 'gray' }]}
                >
                    <Text style={styles.mainButtonText}>NO CHECKOUT NOW</Text>
                </Pressable>
            );
    };

    const getMyLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.show(
                    'You need grant location permission to perform this action',
                    ToastAndroid.LONG
                );
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            return {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            };
        } catch (error) {
            ToastAndroid.show('There was an error when get location, try again', ToastAndroid.LONG);
        }
    };

    const handleOpenCheckout = async () => {
        const minute = new Date().getMinutes();
        const start = `${new Date().getHours()}:${minute < 10 ? '0' + minute.toString() : minute}`;
        const checkoutList = classInfo.member.map((ele) => {
            return {
                student: ele,
                status: 'non-check',
                studentAddress: 'Not found',
            };
        });

        const myLocation = await getMyLocation();

        const tempCheckout = {
            checkoutList: checkoutList,
            startTime: start,
            endTime: 'on-going',
            day: new Date(),
            class: classInfo._id,
            teacherAddress: myLocation,
            status: 'processing',
        };
        dispatch(createCheckout(tempCheckout));
    };

    const handleCloseCheckout = () => {
        const minute = new Date().getMinutes();
        const end = `${new Date().getHours()}:${minute < 10 ? '0' + minute.toString() : minute}`;

        dispatch(
            updateCheckout({
                checkoutId: checkoutInfo._id,
                data: { endTime: end, status: 'finish' },
            })
        );
    };
    const handleCheckout = async (studentId) => {
        try {
            const minute = new Date().getMinutes();
            const time = `${new Date().getHours()}:${
                minute < 10 ? '0' + minute.toString() : minute
            }`;
            const isOntime = checkoutInfo.status === 'processing' ? 'on-time' : 'late';
            const myAddress = await getMyLocation();
            const { teacherAddress } = checkoutInfo;
            const isTooFar =
                calculateDistance(
                    myAddress.lat,
                    myAddress.lng,
                    teacherAddress.lat,
                    teacherAddress.lng
                ) > 150; //must be smaller 150 meters
            const checkItem = {
                time: time,
                student: studentId,
                status: isTooFar ? 'too-far' : isOntime ? 'on-time' : 'late',
            };
            const newCheckList = checkoutInfo.checkoutList.map((ele) => {
                if (studentId === ele.student._id.toString()) return checkItem;
                return ele;
            });
            dispatch(
                updateCheckout({
                    checkoutId: checkoutInfo._id,
                    data: { checkoutList: newCheckList },
                })
            );
        } catch (error) {
            ToastAndroid.show('There was an error when checkout, try again', ToastAndroid.LONG);
            console.log(error);
        }
    };

    const onPickerChange = (value, i) => {
        setSelectClassId(value);
        dispatch(getClassInfo(value));
    };

    const generateSectionDropdown = () => {
        if (todayClassList)
            return todayClassList.map((classDetail) => {
                return (
                    <Picker.Item
                        key={classDetail._id}
                        label={classDetail.name}
                        value={classDetail._id}
                    />
                );
            });
    };

    // load user info
    useEffect(function () {
        const getUser = async () => {
            loadingUser = true;
            const temp = await getUserInfo();
            setUser(temp);
            loadingUser = false;
        };
        getUser();
    }, []);

    // load check info when change item in dropdown
    useEffect(
        function () {
            if (selectClassId) dispatch(getCheckoutByClass(selectClassId));
        },
        [selectClassId]
    );

    // load class info base on current item of dropdown
    useEffect(function () {
        if (todayClassList) {
            const classId = todayClassList[0]?._id || '';
            setSelectClassId(classId);
            dispatch(getClassInfo(classId));
        }
    }, []);

    useEffect(
        function () {
            if (!loadingCheckout && user?.role === 'student') {
                const temp = checkoutInfo.checkoutList?.find((x) => x.student._id === user._id);
                if (temp.status !== 'non-check') setIsCheck(true);
            }
        },
        [loadingCheckout, loadingUser]
    );

    return (
        <View style={{ flex: 1, marginTop: 0 }}>
            <LoadingIndicator loading={loadingClass || loadingCheckout} />
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold', fontSize: 15 }}>
                    Choose your class
                </Text>

                <View style={{}}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                        }}
                    >
                        <Picker onValueChange={onPickerChange} selectedValue={selectClassId}>
                            {generateSectionDropdown()}
                        </Picker>
                    </View>
                </View>
            </View>

            <View
                style={{
                    marginTop: 15,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    elevation: 5,
                    padding: 10,
                    marginHorizontal: 20,
                }}
            >
                <Text style={styles.classInfo}>
                    Class Name:{' '}
                    <Text style={styles.classInfoContent}>
                        {loadingClass ? 'loading...' : classInfo?.name}
                    </Text>
                </Text>
                <Text style={styles.classInfo}>
                    Class start at:{' '}
                    <Text style={styles.classInfoContent}>
                        {loadingClass ? 'loading...' : classInfo?.startTime}
                    </Text>
                </Text>
                <Text style={styles.classInfo}>
                    Class end at:{' '}
                    <Text style={styles.classInfoContent}>
                        {loadingClass ? 'loading...' : classInfo?.endTime}
                    </Text>
                </Text>
                <Text style={styles.classInfo}>
                    Teacher:{' '}
                    <Text style={styles.classInfoContent}>
                        {loadingClass ? 'loading...' : classInfo?.teacher?.name}
                    </Text>
                </Text>
            </View>

            {checkoutInfo?.status === 'processing' ||
            (checkoutInfo?.status === 'finish' && user?.role === 'teacher') ? (
                <CheckOutStatistic checkoutInfo={checkoutInfo} />
            ) : (
                ''
            )}

            <View style={styles.buttonContainer}>{renderCheckoutButton()}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    classInfo: {
        fontWeight: '900',
        color: '#0A426E',
        lineHeight: 25,
        paddingLeft: 7,
    },
    classInfoContent: {
        fontWeight: '500',
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
});
