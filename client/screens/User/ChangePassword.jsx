import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import React, { useState } from 'react';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { validateError } from '../../util/validation/validateError';
import { changePassword, resetPassword } from '../../redux/authentication/authenticationSlice';
import { StackActions, useNavigation } from '@react-navigation/native';

export default function ChangePassword() {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const { loading, changePasswordData } = useSelector((store) => store.authenticationSlice);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

    // const validation = (password) => {

    //     let tempError = {
    //         password: '',
    //     };
    //     if (password.length === 0) tempError.password = validateError.notEnterPassword;
    //     if (password.length >= 1 && password.length < 8)
    //         tempError.password = validateError.tooShortPassword;
    //     setError(tempError);
    //     return tempError.password;
    // };
    const handleSubmit = async () => {
        if (repeatPass !== newPassword) {
            ToastAndroid.show('Your password and retype password not match!', ToastAndroid.LONG);
            return;
        }
        const data = {
            oldPassword,
            newPassword,
        };
        const res = await dispatch(changePassword(data));
        if (res.payload.status === 'ok') {
            navigate.dispatch(StackActions.replace('Login'));
            ToastAndroid.show(
                'Change password successfully, please login again !',
                ToastAndroid.LONG
            );
        } else {
            ToastAndroid.show(res.payload.message, ToastAndroid.LONG);
        }
    };
    return (
        <View style={styles.container}>
            <LoadingIndicator loading={loading} />
            <Text>Enter your old and a new one to change your password</Text>
            <TextInput
                placeholder='Enter your old password'
                style={styles.input}
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
            />
            <TextInput
                placeholder='Enter your new Password'
                style={styles.input}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
                placeholder='Confirm your new Password'
                style={styles.input}
                value={repeatPass}
                onChangeText={(text) => setRepeatPass(text)}
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
        marginTop: 20,
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
