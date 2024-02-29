import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Section from './Section';
import { deleteUserInfo, getUserInfo, saveUserInfo } from '../../util/realm/userRealm';
import { BSON } from 'realm';
import { useNavigation } from '@react-navigation/native';

// const fake = {
//     _id: BSON.ObjectID('65d6ed58b07757a158cfeca0'),
//     name: 'thoty',
//     email: 'thoty@gmail.com',
//     accessToken: 'abcdef',
// };

const Home = () => {
    const navigate = useNavigation();

    const handleCheckout = () => {
        const test = getUserInfo();
        if (test) console.log(test);
    };
    const handleLogout = () => {
        deleteUserInfo();
        navigate.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('./../../assets/logo.png')} style={styles.image} />
                <Text style={styles.name}>Bao Nguyen</Text>
            </View>
            <View style={styles.main}>
                <View
                    style={{
                        marginTop: 25,
                        marginBottom: 25,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: 1 }}>
                        Lịch dạy hôm nay
                    </Text>
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
        height: '100%',
        position: 'relative',
        top: 0,
        left: 0,
    },
    header: {
        marginTop: 45,
        marginLeft: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        marginHorizontal: 20,
    },
    image: {
        borderWidth: 1,
        borderRadius: 9999,
        borderColor: 'white',
        width: 60,
        height: 60,
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
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
