import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import HomePage from './HomePage';
import FirstPage from './FirstPage';

export default function App() {
    const [isHome, setIsHome] = useState(false);

    setTimeout(() => {
        setIsHome(true);
    }, 10 * 1000);

    if (!isHome) return <FirstPage change={setIsHome} />;
    return <HomePage change={setIsHome} />;
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
