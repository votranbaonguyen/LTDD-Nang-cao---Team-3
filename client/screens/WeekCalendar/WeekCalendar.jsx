import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderDatePicker from '../../components/WeekCalendar/HeaderDatePicker'
import WeekDateList from '../../components/WeekCalendar/WeekDateList'
import ListDateWithClass from '../../components/WeekCalendar/ListDateWithClass'
import CollapsedCalendar from '../../components/WeekCalendar/CollapsedCalendar'
import { getDaysOfWeek } from '../../util/DateTime/calendarDate'


const WeekCalendar = () => {
  const [isCollapsed, setIscollapsed] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [datesOfWeek,setDatesOfWeek] = useState([])

  const toggleCalendar = () => {
    setIscollapsed(!isCollapsed)
  }

  const handleSelectDateFormCalendar = (dateString) => {
    setSelectedDate(new Date(dateString))
  }

  useEffect(() => {
    setDatesOfWeek(getDaysOfWeek(selectedDate))
  },[selectedDate])

  return (
    <View style={styles.container}>
      <HeaderDatePicker toggleCalendar={toggleCalendar} selectedDate={selectedDate}/>
      <WeekDateList datesOfWeek={datesOfWeek}/>
      <CollapsedCalendar isCollapsed={isCollapsed} selectDateFunc={handleSelectDateFormCalendar} toggleCalendar={toggleCalendar}/>
      <ListDateWithClass datesOfWeek={datesOfWeek}/>
    </View>
  )
}

export default WeekCalendar

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})