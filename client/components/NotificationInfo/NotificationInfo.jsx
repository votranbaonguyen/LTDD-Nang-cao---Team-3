import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NotificationInfo = ({
    title,
    info,
    notiTime,
    notiDay,
  }) => {
    const dispatch = useDispatch()
    return (
      <Pressable style={styles.container} >
        <View>
          <View style={styles.topContainer}>
            <Text style={{ fontWeight: 'bold', opacity: 0.5 }}>{notiDay}</Text>
            <Text style={{ color: '#d2d4d5' }}> {notiTime}</Text>
          </View>
          <View style={styles.infoContainer}>
          
            <View style={{ flex: 10 }}>
              <Text style={styles.infoHeader}>{title}</Text>
              <Text style={styles.subInfo}>
                {info}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    )
}

export default NotificationInfo

const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
      paddingLeft: 15,
      paddingRight: 20
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    infoContainer: {
      marginTop: 10,
      backgroundColor: 'white',
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 15,
      elevation: 5,
      flexDirection: 'row'
    },
    infoHeader: {
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#074007'
    },
    subInfo: {
      fontSize: 15,
      color: '#074007'
    },
    href: {
      color: 'blue',
      textDecorationLine: 'underline'
    },
    notiIcon: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#c6dcc6',
      width: 100,
      marginRight: 10,
      borderRadius: 15
    }
  })