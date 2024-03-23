import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getDaysOfWeek } from '../../util/DateTime/calendarDate'

const WeekDateList = ({datesOfWeek}) => {
  const renderDatesOfWeek = () => {
    return datesOfWeek.map((date,index) => {
      return (
        <View key={index}>
          <Text>
            {date.getDate()}
          </Text>
        </View>
      )
    })
  }
  return (
    <View style={styles.container}>
      {renderDatesOfWeek()}
    </View>
  )
}

export default WeekDateList

const styles = StyleSheet.create({
  container:{
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor:"white",
    flexDirection: 'row',
    justifyContent: "space-around",
    paddingVertical: 15
  }
})