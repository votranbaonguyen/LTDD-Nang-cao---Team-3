import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CheckOutStatistic({ checkoutInfo }) {
    return (
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
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}
            >
                <Text style={styles.classInfo}>
                    Start time:{' '}
                    <Text style={styles.classInfoContent}>{checkoutInfo.startTime}</Text>
                </Text>
                <Text style={styles.classInfo}>
                    End time:{' '}
                    <Text style={styles.classInfoContent}>
                        {checkoutInfo.endTime.includes(':') ? checkoutInfo.endTime : 'On going'}
                    </Text>
                </Text>
            </View>

            <View
                style={{
                    marginTop: 10,
                    borderRadius: 5,
                    padding: 10,
                    marginHorizontal: 20,
                    flex: 1,
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
                            <Text style={{ fontWeight: '600' }}>{ele.student.name}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text>{ele?.time ? `${ele.time} | ` : '---- | '}</Text>
                                <Text
                                    style={{
                                        color:
                                            ele?.status === 'on-time'
                                                ? 'green'
                                                : ele?.status === 'non-check'
                                                ? 'blue'
                                                : 'red',
                                    }}
                                >
                                    {ele.status}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
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
