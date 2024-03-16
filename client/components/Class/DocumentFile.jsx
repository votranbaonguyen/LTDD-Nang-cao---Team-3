import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeDocumentFile, removeNewDocumentFile } from '../../redux/class/classSlice';

const DocumentFile = ({ documentUrl, editing, documentData, index, sectionId, removeFunc, noMargin }) => {
  const dispatch = useDispatch()
  const [fileName, setFileName] = useState('')
  const getFileNameAndType = async () => {
    try {
      // Extract filename from the URL
      if (documentUrl.length > 0) {
        const url = documentUrl;
        const parts = url.split('/');
        const filenameWithExtension = parts[parts.length - 1];
        setFileName(filenameWithExtension)
      } else {
        setFileName(documentData.name)
      }


    } catch (error) {
      console.error('Error parsing file URL:', error);
    }
  };

  const handleDownload = () => {
    Linking.openURL(documentUrl);
  }

  const handleDeleteFile = () => {
    if (documentData !== undefined) {
      removeFunc(index)
    } else {
      const removeData = {
        sectionId,
        documentIndex: index
      }
      dispatch(removeDocumentFile(removeData))
    }
  }

  useEffect(() => {
    getFileNameAndType()
  }, [documentUrl,documentData])

  return (
    <Pressable style={[styles.container, noMargin ? {marginHorizontal: 0} : {}]} onPress={editing ? null : handleDownload}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1}}>
        <FontAwesome5 name="file" size={24} color="#0A426E" />

        <Text style={styles.fileName}>{fileName}</Text>
        {
          documentData !== undefined ?
            <View style={styles.newTagContainer}>
              <Text style={styles.newTagText}>New</Text>
            </View>
            : <></>
        }

      </View>
      {
       editing && !noMargin  ?
        <Pressable onPress={handleDeleteFile}>
          <Entypo
            name={'cross'}
            size={25}
            color={'red'}
          />
        </Pressable>
        :
        <></>
      
    }
     
    </Pressable>
  )
}

export default DocumentFile

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    padding: 10,
    marginHorizontal: 20,
    justifyContent: "space-between"
  },
  fileName: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
    flex: 3
  },
  newTagContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffa39e',
    backgroundColor: "#fff1f0",
    marginLeft: 10
  },
  newTagText: {
    fontSize: 10,
    color: "#cf1322",
    fontWeight: "bold",
  }
})