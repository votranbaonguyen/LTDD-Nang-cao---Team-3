import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDayNameFromDate } from '../../util/DateTime/calendarDate'
import { useDispatch, useSelector } from 'react-redux';
import { getClassListByDate } from '../../redux/class/classSlice';
import Section from '../../screens/Home/Section';

const DateWithClass = ({ date }) => {
  const dispatch = useDispatch()

  const [classList, setClassList] = useState([])
  const { userInfo } = useSelector((store) => store.userSlice);

  const renderClassList = (() => {
    return classList.map((classDetail) => {
      return (
        <Section
          time={`${classDetail.startTime} - ${classDetail.endTime}`}
          room={classDetail.room}
          isChecked={true}
          teacher={'Bảo Nguyên'}
          name={classDetail.name}
          key={classDetail._id}
          classId={classDetail._id}
          isAllClass={true}
        />
      );
    })
  })

  const getDateClassList = async () => {
    const res = await dispatch(getClassListByDate({ userInfo, date }))
    setClassList(res.payload.data)
  }

  useEffect(() => {
    getDateClassList()
  }, [date])
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateNum}>{date.getDate()}</Text>
        <Text style={styles.dateName}>{getDayNameFromDate(date)}</Text>
      </View>
      <View style={styles.allClassContainer}>
        {renderClassList()}
      </View>
    </View>
  )
}

export default DateWithClass

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  dateContainer: {
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  dateNum: {
    fontSize: 40,
    color: "#aba7b0",
    fontWeight: "bold"
  },
  dateName: {
    fontSize: 20,
    color: "#aba7b0",
    fontWeight: "bold"
  },
  allClassContainer: {
    flex: 1
  }
})