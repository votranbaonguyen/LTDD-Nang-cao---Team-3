import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Section({ time, name, teacher, room, isChecked, classId, isAllClass }) {
    const navigate = useNavigation()
    return (
        <Pressable onPress={() => navigate.navigate("Class", { classId })}>
            <View style={styles.container}>
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: 7.5,
                    }}
                >
                    {/* <View
                        style={{
                            height: 20,
                            width: 20,
                            backgroundColor: 'blue',
                            borderRadius: 9999,
                        }}
                    /> */}
                    <Text
                        style={{
                            fontWeight: 'bold',
                            marginBottom: 4,
                            letterSpacing: 2,
                        }}
                    >
                        {time}
                    </Text>
                </View>
                <View style={styles.container2}>
                    {/* <View
                        style={{
                            width: 8,
                            borderWidth: 3,
                            borderLeftColor: 'blue',
                            borderRightColor: 'blue',
                            borderTopColor: 'white',
                            borderBottomColor: 'white',
                            borderStyle: 'dotted',
                            borderRadius: 1,
                        }}
                    /> */}
                    <View style={styles.content}>
                        <View style={styles.classInfo}>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 7,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ fontSize: 13, fontWeight: '500' }}>{name}</Text>
                                <Text style={{ fontWeight: '500', letterSpacing: 1, fontSize: 12 }}>
                                    {room}
                                </Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 5,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ fontSize: 11, fontWeight: '200' }}>Giảng viên:</Text>
                                <Text style={{ fontWeight: '800' }}>{teacher.name}</Text>
                            </View>
                        </View>
                    </View>
                    {isAllClass ?
                        <Pressable style={styles.check} onPress={() => navigate.navigate("AllComments", { classId })}>
                            <Text style={{ fontSize: 11, fontWeight: '200', textAlign: 'center' }}>View Comments</Text>
                            
                        </Pressable>
                        :
                        <View style={styles.check}>
                            <Text style={{ fontSize: 11, fontWeight: '200' }}>Điểm danh</Text>
                            <Entypo
                                name={isChecked ? 'check' : 'cross'}
                                size={isChecked ? 22 : 30}
                                color={isChecked ? 'green' : 'red'}
                            />
                        </View>
                    }

                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    container2: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 10,
        gap: 10,
    },
    content: {
        flex: 4,
    },
    classInfo: {
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
    },
    check: {
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        gap: 7,
    },
});
