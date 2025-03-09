import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ImageBackground, TouchableOpacity,
  ActivityIndicator, Alert, Vibration
} from 'react-native';
import styles from './HomeScreenStyles';

export default function HomeScreen({ navigation, route }) {
  const [isReady, setIsReady] = useState(false);
  const [username, setUsername] = useState(null); // ✅ 로그인 여부 확인을 위해 `null` 초기값 설정

  useEffect(() => {
    console.log("🟢 HomeScreen received route params:", route.params);

    setIsReady(true);

    // ✅ 올바르게 `username`을 받아서 저장
    if (route.params?.username) {
      setUsername(route.params.username);
    }
  }, [route.params]); // ✅ params 변경 시 업데이트

  if (!isReady) {
    return (
      <View style={[styles.background, { justifyContent: 'center', alignItems: 'center' }]} >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const handlePress = () => {
    if (!username) {
      Vibration.vibrate(500); // 0.5초 진동
      Alert.alert("알림", "로그인 먼저 해주세요.");
      return;
    }
    console.log('버튼이 클릭되었습니다.');
    navigation.navigate('AppHomeScreen'); // AppHomeScreen.js로 이동
  };

  const goToLoginScreen = () => {
    console.log('LoginScreen으로 이동');
    navigation.navigate('Login'); // 로그인 화면으로 이동
  };

  //임시로 넣은 코드- 없앨예정//
  const goToInitialScreen = () => {
    console.log('InitialScreen으로 이동');
    navigation.navigate('Initial01'); // initial.js로 이동
  };
  /////////////////////////////////

  return (
    <ImageBackground
      source={require('../../assets/BackGround.png')}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.imageStyle}
    >
   








      <TouchableOpacity onPress={goToInitialScreen}>
        <Text>Go</Text>
      </TouchableOpacity> 












      <TouchableOpacity
        onPress={handlePress}
        style={styles.button}
        hitSlop={{ top: -90, bottom: -95, left: -80, right: -68 }}
      >
        <Image
          source={require('../../assets/Button01.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          {username ? (
            <Text style={styles.sideText}>{username} 님 환영합니다! 🎉</Text>
          ) : (
            <>
              <Text style={styles.sideText}>이미 회원이신가요?    </Text>
              <TouchableOpacity onPress={goToLoginScreen}>
                <Text style={[styles.middleText, { textDecorationLine: 'underline' }]}>
                  여기서 로그인하기
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>©sprout.company</Text>
      </View>
    </ImageBackground>
  );
}
