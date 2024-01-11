import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomePage({ change }) {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>👉 HomePage</Text>
            <Pressable style={styles.button} onPress={() => change(false)}>
                <Text style={styles.h1}>Go to First</Text>
            </Pressable>
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
