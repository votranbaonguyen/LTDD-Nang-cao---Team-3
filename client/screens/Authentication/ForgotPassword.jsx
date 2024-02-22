import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import LoadingIndicator from '../../util/Loading/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { validateError } from '../../util/validation/validateError';
import { forgotPassword } from '../../redux/authentication/authenticationSlice';
import { useNavigation } from '@react-navigation/native';

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const ForgotPassword = () => {
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const {loading} = useSelector(store => store.authenticationSlice)
  const [email, setEmail] = useState('')
  const [error, setError] = useState({
    email: '',
})

const validation = () => {
  let tempError = {
      email: '',
  }
  if(!email.toLocaleLowerCase().match(re)) tempError.email = validateError.failEmailVailidate
  if(email.length === 0) tempError.email = validateError.notEnterEmail
 
  setError(tempError)
  if(tempError.email.length === 0)
      return true
  else return false
}
const handleSendEmail = async () => {
  let validate = validation()
  if(validate){
      const data = {
          email
      }
      const res = await dispatch(forgotPassword(data))
      if(res.payload.status === 'ok'){
          navigate.navigate("OTPEnter")
          ToastAndroid.show('Email has been sent !', ToastAndroid.LONG);
      }else {
          ToastAndroid.show(res.payload.message, ToastAndroid.LONG);
      }
  }
}
  return (
    <View style={styles.container}>
      <LoadingIndicator loading={loading}/>
      <Text>Enter your email here and we will send a change password email to your email</Text>
      <TextInput placeholder='Enter your email here' style={styles.input} onChangeText={text => setEmail(text)}/>
      <Text style={{color:"red"}}>{error.email}</Text>
      <Pressable style={styles.button} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>SEND</Text>
        <MaterialIcons name="send" size={20} color="white" />
      </Pressable>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex:1
  },
  input: {
    borderWidth: 2,
    borderColor: "#0A426E",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginTop: 20,
    borderRadius: 10
  },
  button: {
    backgroundColor: "#0A426E",
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
    marginTop: 15,
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize:16,
    fontWeight: "bold",
    marginRight: 10
  }
})