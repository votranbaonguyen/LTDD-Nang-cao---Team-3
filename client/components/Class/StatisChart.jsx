import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PieChart } from "react-native-gifted-charts";

const StatisChart = ({data}) => {
    const Piedata=[ {value:50}, {value:80}, {value:90}, {value:70} ]
    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };
    const renderLegendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#009FFF')}
                        <Text style={{ color: '#0A426E' }}>On Time:  {Math.round(data[0].value)}%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#828282')}
                        <Text style={{ color: '#0A426E' }}>Not Submit: {Math.round(data[1].value)}%</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#FF7F97')}
                        <Text style={{ color: '#0A426E' }}>Late: {Math.round(data[2].value)}%</Text>
                    </View>
                </View>
            </>
        );
    };

    return (
        <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            margin: 20,
            marginBottom: 10,
            borderRadius: 20,
            backgroundColor: 'white',
            elevation: 5,
            paddingVertical: 10
          }}>
         
          <View style={{ alignItems: 'center'}}>
            <PieChart
              data={data}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              focusOnPress
              innerCircleColor={'#232B5D'}
              centerLabelComponent={() => {
                return (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                      {Math.round(data[0].value)} %
                    </Text>
                    <Text style={{fontSize: 14, color: 'white'}}>On Time</Text>
                  </View>
                );
              }}
            />
          </View>
          {renderLegendComponent()}
        </View>
      </View>
    )
}

export default StatisChart

const styles = StyleSheet.create({})