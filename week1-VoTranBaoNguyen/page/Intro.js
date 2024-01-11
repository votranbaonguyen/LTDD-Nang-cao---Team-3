import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Intro = () => {
  const navigate = useNavigation()
  
  useEffect(() => {
    setTimeout(() => {
      navigate.navigate('Home')
    }, 10000)
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Họ tên: Võ Trần Bảo Nguyên</Text>
      <Text style={styles.textStyle}>MSSV: 20110138</Text>
      <Text style={styles.textStyle}>Ngày sinh: 22/07/2002</Text>
    </View>
  )
}

export default Intro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  textStyle: {
    fontSize: 20,
    marginVertical: 10
  }
})