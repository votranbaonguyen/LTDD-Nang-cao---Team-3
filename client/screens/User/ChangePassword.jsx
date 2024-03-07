import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import React, { useState } from 'react';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { validateError } from '../../util/validation/validateError';
import { resetPassword } from '../../redux/authentication/authenticationSlice';
import { StackActions, useNavigation } from '@react-navigation/native';

export default function ChangePassword() {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const { loading, changePasswordData } = useSelector((store) => store.authenticationSlice);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        password: '',
    });

    const validation = () => {
        let tempError = {
            password: '',
        };
        if (password.length === 0) tempError.password = validateError.notEnterPassword;
        if (password.length >= 1 && password.length < 8)
            tempError.password = validateError.tooShortPassword;
        setError(tempError);
        return tempError.password;
    };
    const handleSubmit = async () => {
        let validate = validation();
        if (validate.length === 0) {
            const data = {
                userId: changePasswordData.userId,
                newPassword: password,
                resetToken: otp,
            };
            const res = await dispatch(resetPassword(data));
            if (res.payload.status === 'ok') {
                navigate.dispatch(StackActions.replace('Login'));
                ToastAndroid.show('Reset Password Success !', ToastAndroid.LONG);
            } else {
                ToastAndroid.show(res.payload.message, ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show(validate, ToastAndroid.LONG);
        }
    };
    return (
        <View style={styles.container}>
            <LoadingIndicator loading={loading} />
            <Text>Enter your old and a new one to change your password</Text>
            <TextInput
                placeholder='Enter your old password'
                style={styles.input}
                onChangeText={(text) => setOtp(text)}
            />
            <TextInput
                placeholder='Enter your new Password'
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                placeholder='Confirm your new Password'
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={{ display: 'flex', flexDirection: 'row-reverse', gap: 10 }}>
                <Pressable style={[styles.button, { flexGrow: 1 }]} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.secondButton, { flexGrow: 1 }]}
                    onPress={() => navigate.goBack()}
                >
                    <Text style={[styles.buttonText, styles.secondButtonText]}>CANCEL</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        flex: 1,
        marginTop: 70,
    },
    input: {
        borderWidth: 2,
        borderColor: '#0A426E',
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginTop: 20,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#0A426E',
        paddingHorizontal: 12,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 5,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
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
});
