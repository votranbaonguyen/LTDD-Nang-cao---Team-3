import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Section from './Section';
import { deleteUserInfo, getUserInfo } from '../../util/storage/userStorage';
import { BSON } from 'realm';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

// const fake = {
//     _id: BSON.ObjectID('65d6ed58b07757a158cfeca0'),
//     name: 'thoty',
//     email: 'thoty@gmail.com',
//     accessToken: 'abcdef',
// };

const Home = () => {
    const navigate = useNavigation();
    const [userInfo, setUserInfo] = useState(getUserInfo());

    console.log(userInfo);
    const handleCheckout = async () => {
        const test = await getUserInfo();
        if (test) console.log(test);
    };
    const handleLogout = async () => {
        await deleteUserInfo();
        navigate.navigate('Login');
    };

    return (
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <View style={styles.avatarContainer} >
                    <FontAwesome name='user' size={40} color='#0A426E' />
                </View>
                <Text style={styles.name}>{userInfo.name}</Text>
            </View> */}
            <View style={styles.main}>
                <View
                    style={{
                        marginTop: 25,
                        marginBottom: 25,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Today's Class</Text>
                </View>
                <Section
                    time={'7:00 AM'}
                    room={'A2-301'}
                    isChecked={true}
                    teacher={'Bảo Nguyên'}
                    name={'Toán 1'}
                />
                <Section
                    time={'9:15 AM'}
                    room={'A5-109'}
                    isChecked={true}
                    teacher={'Thọ Tỷ'}
                    name={'Vật lý 1'}
                />
                <Section
                    time={'12:30 PM'}
                    room={'SVD008'}
                    isChecked={false}
                    teacher={'Buyên Ngao'}
                    name={'Giáo dục thể chất 1'}
                />
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
});
