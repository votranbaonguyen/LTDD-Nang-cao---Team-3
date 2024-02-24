import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authentication/authenticationSlice';
import { validateError } from '../../util/validation/validateError';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
//
import Realm, { BSON } from 'realm';
import { getUserInfo, saveUserInfo } from '../../util/realm/userRealm';

const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Login = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.authenticationSlice);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState({
        email: '',
        password: '',
    });

    let rememberUser;
    useEffect(
        function () {
            rememberUser = getUserInfo();
            if (rememberUser) {
                // check if token is valid, or check if user authenticated
                // anh Nguyên viết giúp em hàm redux call api authen chỗ này iii :)) lười mò redux quá.
                navigate.navigate('Root', { screen: 'Home' });
            }
        },
        [rememberUser, getUserInfo, navigate]
    );

    const validation = () => {
        let tempError = {
            email: '',
            password: '',
        };
        if (!email.toLocaleLowerCase().match(re))
            tempError.email = validateError.failEmailVailidate;
        if (email.length === 0) tempError.email = validateError.notEnterEmail;

        if (password.length === 0) tempError.password = validateError.notEnterPassword;
        setError(tempError);
        if (tempError.email.length === 0 && tempError.password.length === 0) return true;
        else return false;
    };

    const handleLogin = async () => {
        let validate = validation();
        if (validate) {
            const loginData = {
                email,
                password,
            };
            const res = await dispatch(login(loginData));
            if (res.payload.status === 'ok') {
                navigate.navigate('Root', { screen: 'Home' });
                ToastAndroid.show('Login success !', ToastAndroid.LONG);

                const token = res.payload.accessToken;
                const userData = res.payload.user;
                saveUserInfo({ ...userData, _id: BSON.ObjectID(userData._id), accessToken: token });
            } else {
                ToastAndroid.show(res.payload.message, ToastAndroid.LONG);
            }
        }
    };

    const handleInput = (type, text) => {
        switch (type) {
            case 'email':
                setEmail(text);
                break;
            case 'password':
                setPassword(text);
                break;
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <LoadingIndicator loading={loading} />
            <View style={styles.logoContainer}>
                <Image source={require('./../../assets/logo.png')} />
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.loginWelcomeConatainer}>
                    <Text style={styles.loginWelcomeText}>Welcome, Please login</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        value={email}
                        style={styles.input}
                        onChangeText={(text) => {
                            handleInput('email', text);
                        }}
                    />
                    <MaterialIcons name='email' size={24} color='#ccc' style={styles.icon} />
                    <Text style={styles.errorText}>{error.email}</Text>
                </View>
                <View style={[styles.inputFieldContainer, { marginTop: 30 }]}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(text) => {
                            handleInput('password', text);
                        }}
                    />
                    <MaterialIcons name='vpn-key' size={24} color='#ccc' style={styles.icon} />
                    <Text style={styles.errorText}>{error.password}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.mainButton]} onPress={handleLogin}>
                        <Text style={styles.mainButtonText}>LOGIN</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.secondButton, { marginTop: 15 }]}
                        onPress={() => navigate.navigate('Register')}
                    >
                        <Text style={styles.secondButtonText}>REGISTER</Text>
                    </Pressable>
                    <Pressable
                        style={styles.forgotPassContainer}
                        onPress={() => navigate.navigate('ForgotPassword')}
                    >
                        <Text style={styles.forgotPassText}>Forgot password ?</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 3,
        paddingHorizontal: 30,
    },
    loginWelcomeConatainer: {
        marginBottom: 15,
    },
    loginWelcomeText: {
        fontSize: 20,
        color: '#0A426E',
        fontWeight: 'bold',
    },
    inputFieldContainer: {
        position: 'relative',
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        paddingVertical: 5,
        paddingLeft: 30,
        paddingRight: 10,
        fontSize: 16,
    },
    icon: {
        position: 'absolute',
        bottom: 25,
        left: 0,
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 30,
    },
    button: {
        paddingVertical: 12,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
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
    },

    secondButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
    },

    secondButtonText: {
        color: '#0A426E',
        fontSize: 15,
        fontWeight: 'bold',
    },
    forgotPassContainer: {
        marginTop: 5,
        paddingVertical: 10,
    },
    forgotPassText: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: '#0A426E',
        textDecorationColor: '#0A426E',
    },
    errorText: {
        color: 'red',
    },
});
