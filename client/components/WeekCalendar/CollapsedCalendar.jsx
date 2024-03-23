import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Collapsible from 'react-native-collapsible';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CollapsedCalendar = ({ isCollapsed, selectDateFunc, toggleCalendar }) => {
    const [selected, setSelected] = useState('');
    return (
        <Collapsible collapsed={isCollapsed}>
            <View>
                <Calendar

                    onDayPress={day => {
                        setSelected(day.dateString);
                        selectDateFunc(day.dateString)
                        toggleCalendar()
                    }}
                    markedDates={{
                        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                      }}
                />
            </View>
        </Collapsible>
    )
}

export default CollapsedCalendar

const styles = StyleSheet.create({})