import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import ClassSection from '../../components/Class/ClassSection';
import { getUserInfo } from '../../util/realm/userRealm';
import { useDispatch, useSelector } from 'react-redux';
import { getClassInfo } from '../../redux/class/classSlice';

const Class = () => {
  const dispatch = useDispatch()

  const [selectedSection, setSelectedSection] = useState()
  const {classInfo} = useSelector(store => store.classSlice)
  const generateSectionDropdown = () => {
      if(classInfo)
        return classInfo.section.map((section) => {
          return <Picker.Item key={section._id} label={section.name} value={section._id}/>
        })
  }

  const getSectionData = () => {
    if(classInfo){
      let index = classInfo.section.findIndex((section) => section._id === selectedSection)
      return classInfo.section[index]
    }else return null
  }


  useEffect(() => {
    dispatch(getClassInfo('65e4652bfa6ef7eb94593d71'))
  },[])

  useEffect(() => {
    setSelectedSection(classInfo?.section[0]._id)
  },[classInfo])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={27} color="black" />
        <Text style={styles.headerText}>A2-301</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.classDetailContainer}>
            <Text style={styles.className}>{classInfo?.name}</Text>
            <Text style={styles.classTime}>7:00 AM - 9:15 AM</Text>
        </View>
        <View style={styles.sectionDropdownContainer}>
          <Text style={styles.sectionTitle}>Section</Text>
          <View style={styles.picker}>
          <Picker selectedValue={selectedSection} onValueChange={(itemValue, itemIndex) => {setSelectedSection(itemValue)}}>
            {generateSectionDropdown()}
          </Picker>
          </View>
        </View>
        <ClassSection sectionData={getSectionData()}/>
      </View>
    </SafeAreaView>
  )
}

export default Class

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 40,
    backgroundColor:"#5BA591"
  },
  header:{
    flex:2,
    backgroundColor:"#5BA591",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  headerText:{
    fontSize: 20,
    fontWeight: "bold"
  },
  body:{
    flex:15,
    backgroundColor:"#EEF2F8",
    position:"relative"
  },
  classDetailContainer:{
    backgroundColor: "#0A426E",
    position:"absolute",
    width:"85%",
    alignSelf:"center",
    height: 90,
    top: -45,
    borderRadius: 5,
    justifyContent: "space-evenly",
    paddingHorizontal: 15
  },
  className:{
    fontSize: 20,
    fontWeight:"bold",
    color:"white"
  },
  classTime:{
    color: "white",
  },
  sectionDropdownContainer: {
    marginTop: 55,
    paddingHorizontal: 20
  },
  sectionTitle:{
    fontSize: 18,
    fontWeight:"bold",
    marginBottom:10
  },
  picker:{
    borderWidth: 1,
    borderColor:"#ccc",
    borderRadius: 5
  }
})