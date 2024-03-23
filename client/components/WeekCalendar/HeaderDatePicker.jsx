import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { getMonthNameFromDate } from '../../util/DateTime/calendarDate';



const HeaderDatePicker = ({toggleCalendar,selectedDate}) => {


  return (
    <View style={styles.container}>
      <Pressable style={styles.monthTitle} onPress={toggleCalendar}>
        <Entypo name='calendar' size={24} color={"white"} />
        <Text style={styles.monthTitleText}>{getMonthNameFromDate(selectedDate)}</Text>
      </Pressable>
    
     
    </View>
  )
}

export default HeaderDatePicker

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A426E",
    paddingTop: 50,
    paddingBottom: 20
  },
  monthTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  monthTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
})