import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

// ✅ SoilMoistureChart 컴포넌트: 토양 습도를 원형 차트로 시각화
const SoilMoistureChart = () => {
    const [moisture, setMoisture] = useState(50); // 초기 습도를 50%로 설정

    const radius = 70; // TemperatureChart와 동일한 반지름 크기
    const strokeWidth = 15; // TemperatureChart와 동일한 선 굵기
    const circumference = 2 * Math.PI * radius; // 원 둘레 계산
    const progress = (moisture / 100) * circumference; // 현재 습도에 따른 진행 길이 계산

    // TODO: 나중에 아두이노 기기와 연결해 실시간 데이터를 받아올 때 아래 useEffect를 활성화하세요.
    // 예시) WebSocket을 이용해 Arduino 데이터 수신
    /*
    useEffect(() => {
      // 자신의 서버 URL을 입력하세요.
      const socket = new WebSocket('ws://your-arduino-server-url');
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.moisture !== undefined) {
          setMoisture(data.moisture);
        }
      };
      return () => socket.close();
    }, []);
    */

    return (
        <View style={styles.container}>
            <View style={styles.chartWrapper}>
                <Svg width={200} height={200}>
                    {/* 배경 원 */}
                    <Circle
                        cx="100" cy="100" r={radius}
                        stroke="#E9F7E2"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    {/* 진행 원 */}
                    <Circle
                        cx="100" cy="100" r={radius}
                        stroke="#32720F"
                        strokeWidth={strokeWidth}
                        fill="#E9F7E2"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                    />
                </Svg>
                {/* 가운데에 습도 값 표시 */}
                <Text style={styles.label}>{moisture} %</Text>
            </View>

            {/* Temperature 텍스트 박스 */}
            <View style={styles.tempBox}>
                <Text style={styles.tempText}>Soil moisture</Text>
            </View>

        </View>
    );
};

// ✅ TemperatureChart와 동일한 스타일 적용
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 130,
        bottom: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -20,

    },
    chartWrapper: {
        position: "relative",
        width: 200,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        position: "absolute",
        fontSize: 35, // 글씨 크기 조정
        fontWeight: "bold",
        color: "#12491E",
    },
    tempBox: {
        position: 'absolute',
        right: -97, // 원의 왼편에 위치
        bottom: 90, // 원과 수평 맞추기
        backgroundColor: '#32720F', // 배경색
        paddingHorizontal: 7.5,
        paddingVertical: 4.5,
        borderRadius: 60,
        borderColor: '#32720F',
      },
      tempText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
});

export default SoilMoistureChart;
