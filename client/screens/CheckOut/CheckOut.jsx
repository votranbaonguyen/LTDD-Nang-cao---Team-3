import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getClassInfo } from '../../redux/class/classSlice';
import {
    createCheckout,
    updateCheckout,
    getCheckoutByClass,
} from '../../redux/checkout/checkoutSlice';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
import { getUserInfo } from '../../util/storage/userStorage';

export default function CheckOut() {
    const dispatch = useDispatch();
    const {
        todayClassList,
        loading: loadingClass,
        classInfo,
    } = useSelector((store) => store.classSlice);
    const [user, setUser] = useState(null);
    let loadingUser = false;
    const {
        loading: loadingCheckout,
        checkoutInfo,
        isProcessing,
    } = useSelector((store) => store.checkoutSlice);

    const [selectClassId, setSelectClassId] = useState(null);
    const [isCheck, setIsCheck] = useState(false);

    console.log(isCheck);

    const renderCheckoutButton = () => {
        if (isProcessing && user?.role === 'teacher')
            return (
                <Pressable
                    onPress={handleCloseCheckout}
                    disabled={loadingClass || loadingCheckout || loadingUser}
                    style={[styles.button, styles.mainButton, { backgroundColor: 'red' }]}
                >
                    <Text style={styles.mainButtonText}>STOP CHECKOUT</Text>
                </Pressable>
            );
        else if (!isProcessing && user?.role === 'teacher')
            return (
                <Pressable
                    onPress={handleOpenCheckout}
                    disabled={loadingClass || loadingCheckout || loadingUser}
                    style={[styles.button, styles.mainButton]}
                >
                    <Text style={styles.mainButtonText}>START CHECKOUT</Text>
                </Pressable>
            );
        else if (isProcessing && user?.role === 'student' && isCheck === false)
            return (
                <Pressable
                    onPress={() => handleCheckout(user._id)}
                    disabled={loadingClass || loadingCheckout || loadingUser}
                    style={[styles.button, styles.mainButton]}
                >
                    <Text style={styles.mainButtonText}>CHECKOUT NOW</Text>
                </Pressable>
            );
        else if (isProcessing && user?.role === 'student' && isCheck === true)
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

    const handleOpenCheckout = () => {
        const minute = new Date().getMinutes();
        const start = `${new Date().getHours()}:${minute < 10 ? '0' + minute.toString() : minute}`;
        const checkoutList = classInfo.member.map((ele) => {
            return {
                student: ele,
                status: 'non-check',
                studentAddress: 'Not found',
            };
        });
        const tempCheckout = {
            checkoutList: checkoutList,
            startTime: start,
            endTime: 'on-going',
            day: new Date(),
            class: classInfo._id,
        };
        dispatch(createCheckout(tempCheckout));
    };

    const handleCloseCheckout = () => {
        const minute = new Date().getMinutes();
        const end = `${new Date().getHours()}:${minute < 10 ? '0' + minute.toString() : minute}`;

        dispatch(
            updateCheckout({
                checkoutId: checkoutInfo._id,
                data: { endTime: end, isProcessing: false },
            })
        );
    };
    const handleCheckout = (studentId) => {
        const minute = new Date().getMinutes();
        const time = `${new Date().getHours()}:${minute < 10 ? '0' + minute.toString() : minute}`;
        const isOntime =
            checkoutInfo.endTime.split(':')[0] > new Date().getHours() ? 'on-time' : 'late';
        const checkItem = {
            time: time,
            student: studentId,
            status: isOntime,
        };
        const newCheckList = checkoutInfo.checkoutList.map((ele) => {
            if (studentId === ele.student._id.toString()) return checkItem;
            return ele;
        });
        dispatch(
            updateCheckout({ checkoutId: checkoutInfo._id, data: { checkoutList: newCheckList } })
        );
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

    useEffect(function () {
        const getUser = async () => {
            loadingUser = true;
            const temp = await getUserInfo();
            setUser(temp);
            loadingUser = false;
        };
        getUser();
    }, []);

    useEffect(
        function () {
            if (selectClassId) dispatch(getCheckoutByClass(selectClassId));
        },
        [selectClassId]
    );

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
                const temp = checkoutInfo.checkoutList.find((x) => x.student._id === user._id);
                if (temp.status !== 'non-check') setIsCheck(true);
            }
        },
        [loadingCheckout, loadingUser]
    );

    return (
        <View style={{ flex: 1 }}>
            <LoadingIndicator loading={loadingClass || loadingCheckout} />
            <View style={{ paddingHorizontal: 20 }}>
                <Text
                    style={{ marginTop: 100, marginBottom: 10, fontWeight: 'bold', fontSize: 15 }}
                >
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

            {isProcessing ? (
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Checkout Statistic</Text>

                    <View
                        style={{
                            marginTop: 10,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            elevation: 5,
                            padding: 10,
                            marginHorizontal: 20,
                        }}
                    >
                        <Text style={styles.classInfo}>
                            Checkout start time:{' '}
                            <Text style={styles.classInfoContent}>{checkoutInfo.startTime}</Text>
                        </Text>
                        <Text style={styles.classInfo}>
                            Checkout end time:{' '}
                            <Text style={styles.classInfoContent}>
                                {checkoutInfo.endTime.includes(':')
                                    ? checkoutInfo.endTime
                                    : 'On going'}
                            </Text>
                        </Text>
                    </View>

                    <ScrollView
                        style={{
                            marginTop: 10,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            elevation: 5,
                            padding: 10,
                            marginHorizontal: 20,
                            flex: 1,
                            maxHeight: 200,
                        }}
                    >
                        {checkoutInfo.checkoutList.map((ele) => {
                            return (
                                <View
                                    key={Math.random()}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>{ele?.time ? ele.time : '----'}</Text>
                                    <Text style={{ fontWeight: '600' }}>{ele.student.name}</Text>
                                    <Text>{ele.status}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
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
        lineHeight: 33,
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
