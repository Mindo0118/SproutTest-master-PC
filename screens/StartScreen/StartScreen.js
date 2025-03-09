import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text } from 'react-native';
import styles from './StartScreenStyles';

export default function StartScreen({ navigation }) {
  useEffect(() => {
    // 2.5초 후에 HomeScreen으로 네비게이션
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 2500);

    // 컴포넌트가 언마운트 될 때 타이머 클리어
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.footerText}>©sprout.company</Text>
      <StatusBar style="auto" />
    </View>
  );
}
