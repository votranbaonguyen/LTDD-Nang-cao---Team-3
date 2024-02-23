import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Section({ time, name, teacher, room, isChecked }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 4 }}>{time}</Text>
            <View style={styles.container2}>
                <View style={styles.content}>
                    <View style={styles.classInfo}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 7,
                            }}
                        >
                            <Text>{name}</Text>
                            <Text>{room}</Text>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 5,
                            }}
                        >
                            <Text>Giảng viên:</Text>
                            <Text style={{ fontWeight: '600' }}>{teacher}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.check}>
                    <Text style={{ fontSize: 11 }}>Điểm danh</Text>
                    <Text style={{ fontSize: 20, color: isChecked ? 'green' : 'red' }}>
                        {isChecked ? '✔' : '❌'}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        margin: 10,
    },
    container2: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 5,
        gap: 10,
    },
    content: {
        flex: 4,
    },
    classInfo: {
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
    },
    check: {
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
});
