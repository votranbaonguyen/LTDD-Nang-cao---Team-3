import { ActivityIndicator, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
import { validateError } from '../../util/validation/validateError';
import { register, setRegisterSuccess } from '../../redux/authentication/authenticationSlice';

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Register = () => {
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const {loading,registerSuccess} = useSelector(store => store.authenticationSlice)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState({
        name: '',
        email: '',
        password: ''
    })

    const validation = () => {
        let tempError = {
            name: '',
            email: '',
            password: ''
        }
        if(name.length === 0) tempError.name = validateError.notEnterName
        if(!email.toLocaleLowerCase().match(re)) tempError.email = validateError.failEmailVailidate
        if(email.length === 0) tempError.email = validateError.notEnterEmail
        if(password.length === 0) tempError.password = validateError.notEnterPassword
        if(password.length >= 1 && password.length < 8) tempError.password = validateError.tooShortPassword
        setError(tempError)
        if(tempError.name.length === 0 && tempError.email.length === 0 && tempError.password.length === 0)
            return true
        else return false
    }

    const handleRegister = async () => {
        let validate = validation()
        if(validate){
            const registerData = {
                name,
                email,
                password
            }
            const res = await dispatch(register(registerData))
            if(res.payload.status === 'ok'){
                navigate.navigate("Login")
                ToastAndroid.show('Create new account success !', ToastAndroid.LONG);
            }
        }
    }

    const handleInput = (type, text) => {
        switch(type) {
            case 'name': 
                setName(text)
                break;
            case 'email':
                setEmail(text)
                break;
            case 'password':
                setPassword(text)
                break;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <LoadingIndicator loading={loading}/>
            <View style={styles.logoContainer}>
                <Image source={require('./../../assets/logo.png')} />
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.loginWelcomeConatainer}>
                    <Text style={styles.loginWelcomeText}>Create new account</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput style={styles.input} onChangeText={(text) => {handleInput('name',text)}}/>
                    <MaterialIcons name="person" size={24} color="#ccc" style={styles.icon} />
                    <Text style={styles.errorText}>{error.name}</Text>
                </View>
                <View style={[styles.inputFieldContainer, { marginTop: 30 }]}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput style={styles.input} onChangeText={(text) => {handleInput('email',text)}}/>
                    <MaterialIcons name="email" size={24} color="#ccc" style={styles.icon} />
                    <Text style={styles.errorText}>{error.email}</Text>
                </View>
                <View style={[styles.inputFieldContainer, { marginTop: 30 }]}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput secureTextEntry={true} style={styles.input} onChangeText={(text) => {handleInput('password',text)}}/>
                    <MaterialIcons name="vpn-key" size={24} color="#ccc" style={styles.icon} />
                    <Text style={styles.errorText}>{error.password}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.mainButton]} onPress={handleRegister}>
                        <Text style={styles.mainButtonText}>REGISTER</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.secondButton, { marginTop: 15 }]} onPress={() => navigate.navigate("Login")}>
                        <Text style={styles.secondButtonText}>LOGIN</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        position:"relative"
    },
    logoContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
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
        color: "#0A426E",
        fontWeight: "bold"
    },
    inputFieldContainer: {
        position: "relative"
    },
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 2,
        paddingVertical: 5,
        paddingLeft: 30,
        paddingRight: 10,
        fontSize: 16
    },
    icon: {
        position: "absolute",
        bottom: 25,
        left: 0
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: "bold"
    },
    buttonContainer: {
        marginTop: 30
    },
    button: {
        paddingVertical: 12,
        width: "100%",
        alignItems: "center",
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
        backgroundColor: "#0A426E",
        borderWidth: 1,
        borderColor: "#0A426E"
    },
    mainButtonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    },

    secondButton: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ccc"
    },

    secondButtonText: {
        color: "#0A426E",
        fontSize: 15,
        fontWeight: "bold"
    },
    forgotPassContainer: {
        marginTop: 5,
        paddingVertical: 10
    },
    forgotPassText: {
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: "#0A426E",
        textDecorationColor: "#0A426E"
    },
    errorText: {
        color: "red"
    }
})