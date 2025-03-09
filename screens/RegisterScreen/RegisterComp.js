import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';

export default function RegisterComp({ navigation }) {
  const soundRef = useRef();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/pop.mp3'), // 소리 파일 경로 (예시)
        { shouldPlay: true }              // 자동 재생
      );
      soundRef.current = sound;
    }, 920); // 1초 후 실행

    return () => {
      clearTimeout(timer);
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/back_icon2.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* 기존 로고 이미지 대신 Lottie 애니메이션 사용 */}
      <LottieView
        source={require('../../assets/Logo4.json')}
        autoPlay
        loop={false} // 한 번만 재생 (루프 비활성화)
        style={styles.logo}
      />

      <Text style={styles.title}>가입완료!</Text>

      {/* 버튼을 누르면 Initial01.js로 이동 */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Initial01')}>
        <Image source={require('../../assets/startButton.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      <Text style={styles.footer}>©sprout.company</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 22,
    zIndex: 1,
  },
  backIcon: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
  logo: {
    width: 1000,
    height: 200,
    marginBottom: 8,
  },
  title: {
    color: '#438E1A',
    fontSize: 22,
    fontWeight: 'medium',
    marginBottom: 50,
  },
  button: {
    marginBottom: 140,
  },
  buttonImage: {
    width: 208.33,
    height: 66.67,
  },
  footer: {
    fontSize: 13,
    color: '#868585',
    position: 'absolute',
    bottom: 22,
  },
});
