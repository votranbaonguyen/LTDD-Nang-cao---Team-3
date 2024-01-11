import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import HomePage from './HomePage';

export default function FirstPage({ change }) {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>👉 Trang giới thiệu bản thân của tôi</Text>
            <Text>💘 Họ và tên: Huỳnh Hồ Thọ Tỷ</Text>
            <Text>😁 MSSV: 20110597</Text>
            <Text>🚕 Giới tính: Nam 100%</Text>
            <Text>🍀 Tuổi: 22</Text>

            <Pressable style={styles.button} onPress={() => change(true)}>
                <Text style={styles.h1}>Go to HomePage</Text>
            </Pressable>
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 9999,
        padding: 10,
        paddingHorizontal: 15,
        color: 'white',
    },
});
