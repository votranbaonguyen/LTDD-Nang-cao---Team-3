import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateWithClass from './DateWithClass'

const ListDateWithClass = ({datesOfWeek}) => {
  const renderDateOfWeekWithClass = () => {
    return datesOfWeek.map((date,index) => {
      return <DateWithClass date={date} key={index}/>
    })
  }
  return (
    <ScrollView style={styles.container}>
      {renderDateOfWeekWithClass()}
    </ScrollView>
  )
}

export default ListDateWithClass

const styles = StyleSheet.create({
  container: {
    flex: 15
  }
})