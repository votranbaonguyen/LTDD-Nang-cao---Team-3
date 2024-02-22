import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const navigate = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={require('./../../assets/logo.png')}/>
        </View>
        <View style={styles.loginContainer}>
            <View style={styles.loginWelcomeConatainer}>
                <Text style={styles.loginWelcomeText}>Create new account</Text>
            </View>
            <View style={styles.inputFieldContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput style={styles.input}/>
                <MaterialIcons name="person" size={24} color="#ccc" style={styles.icon}/>
            </View>
            <View style={[styles.inputFieldContainer,{marginTop: 30}]}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput style={styles.input}/>
                <MaterialIcons name="email" size={24} color="#ccc" style={styles.icon}/>
            </View>
            <View style={[styles.inputFieldContainer,{marginTop: 30}]}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.input}/>
                <MaterialIcons name="vpn-key" size={24} color="#ccc" style={styles.icon}/>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button,styles.mainButton]}>
                    <Text style={styles.mainButtonText}>REGISTER</Text>
                </Pressable>
                <Pressable style={[styles.button,styles.secondButton,{marginTop: 15}]} onPress={() => navigate.navigate("Login")}>
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
        marginTop: 50,
        flex: 1
    },
    logoContainer:{
        alignItems:"center",
        flex:1,
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
        position:"relative"
    },
    input:{
        borderBottomColor: "#ccc",
        borderBottomWidth: 2,
        paddingVertical: 5,
        paddingLeft: 30,
        paddingRight: 10,
        fontSize: 18
    },
    icon:{
        position:"absolute",
        bottom: 7,
        left: 0
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: "bold"
    },
    buttonContainer: {
        marginTop: 30
    },
    button:{
        paddingVertical: 12,
        width: "100%",
        alignItems:"center",
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
        borderColor:"#0A426E"
    },
    mainButtonText: {
        color:"white",
        fontSize: 15,
        fontWeight: "bold"
    },

    secondButton: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor:"#ccc"
    },
    
    secondButtonText: {
        color:"#0A426E",
        fontSize: 15,
        fontWeight: "bold"
    },
    forgotPassContainer: {
        marginTop: 5,
        paddingVertical: 10
    },
    forgotPassText: {
        textDecorationLine:"underline",
        fontWeight:"bold",
        color: "#0A426E",
        textDecorationColor:"#0A426E"
    }
})