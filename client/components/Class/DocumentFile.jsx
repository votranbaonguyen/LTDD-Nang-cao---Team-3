import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const DocumentFile = ({documentUrl}) => {
  const [fileName, setFileName] = useState('')
  const getFileNameAndType = async () => {
    try {
      // Extract filename from the URL
      const url = documentUrl;
      const parts = url.split('/');
      const filenameWithExtension = parts[parts.length - 1];
      setFileName(filenameWithExtension)
      
    } catch (error) {
      console.error('Error parsing file URL:', error);
    }
  };

  const handleDownload = () => {
    Linking.openURL(documentUrl);
  }
  useEffect(() => {
    getFileNameAndType()
  },[documentUrl])

  return (
    <Pressable style={styles.container} onPress={handleDownload}>
        <FontAwesome5 name="file" size={24} color="#0A426E" />
        <Text style={styles.fileName}>{fileName}</Text>
    </Pressable>
  )
}

export default DocumentFile

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"white",
        borderRadius: 5,
        elevation: 5,
        padding: 10,
        marginHorizontal:20
    },
    fileName: {
        marginLeft: 10,
        fontSize:15,
        fontWeight:"bold"
    }
})