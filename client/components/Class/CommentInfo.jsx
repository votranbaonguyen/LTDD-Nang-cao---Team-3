import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CommentInfo = ({comment}) => {
    const {
        content,
        user,
        createdAt
    } = comment
    console.log(user)
  return (
    <Pressable style={styles.container} >
    <View>
      
      <View style={styles.infoContainer}>
      
        <View style={{ flex: 10 }}>
          <Text style={styles.infoHeader}>{user.name}</Text>
          <Text style={styles.subInfo}>
            {content}
          </Text>
        </View>
      </View>
      <View style={styles.topContainer}>
        <Text style={{ fontWeight: 'bold', opacity: 0.5 }}>{createdAt.split("T")[0]}</Text>
      </View>
    </View>
  </Pressable>
  )
}

export default CommentInfo

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        paddingLeft: 15,
        paddingRight: 20
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:5
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