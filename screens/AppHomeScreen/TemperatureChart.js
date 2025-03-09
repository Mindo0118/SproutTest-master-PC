// TemperatureChart.js 상단
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const TemperatureChart = ( ) => {
    // 온도 값을 상태로 관리 (초기값은 20)
    const [temperature, setTemperature] = useState(20);
  
    // TODO: 나중에 아두이노 기기와 연결해 실시간 데이터를 받아올 때 아래 useEffect를 활성화하세요.
    // 예시) WebSocket을 이용해 Arduino 데이터 수신
    /*
    useEffect(() => {
      // 자신의 서버 URL을 입력하세요.
      const socket = new WebSocket('ws://your-arduino-server-url');
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.temperature !== undefined) {
          setTemperature(data.temperature);
        }
      };
      return () => socket.close();
    }, []);
    */
  
    // 원형 차트 계산
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const progress = temperature; // 온도 값을 0~100 범위의 진행률로 가정
    const strokeWidth = 15; // 선 굵기
    const strokeDashoffset = circumference * (1 - progress / 100);
  
    return (
      <View style={styles.chartContainer}>
        <Svg width={200} height={200}>
          {/* 배경 원 */}
          <Circle
            stroke="#E9F7E2"
            fill="#E9F7E2"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* 진행률 원 */}
          <Circle
            stroke="#32720F"
            fill="#E9F7E2"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${strokeDashoffset}`}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.chartCenter}>
          <Text style={styles.chartText}>{temperature} ℃</Text>
        </View>

         {/* Temperature 텍스트 박스 */}
         <View style={styles.tempBox}>
          <Text style={styles.tempText}>Temperature</Text>
        </View>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    chartContainer: {
      position: "absolute",
      left: 130,
      top: 8,
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chartCenter: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chartText: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#12491E',
    },
    tempBox: {
        position: 'absolute',
        left: -93, // 원의 왼편에 위치
        top: 76, // 원과 수평 맞추기
        backgroundColor: '#32720F', // 배경색
        paddingHorizontal: 7.5,
        paddingVertical: 4.5,
        borderRadius: 60,
        borderColor: '#32720F',
      },
      tempText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
  });
  export default TemperatureChart;

  