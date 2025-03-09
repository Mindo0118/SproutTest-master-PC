import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  InteractionManager,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Vibration,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import styles from './LoginScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { validateLogin } from '../../constants/auth'; // ✅ 로그인 API 함수 사용

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
    return () => task.cancel();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert('⚠️ 오류', '이메일과 비밀번호를 입력해주세요.');
    return;
  }

  try {

      // 임시 계정 설정 - 아래 코드 주석 처리
      /*
      const fakeAccount = {
        email: '123@google.com',
        password: '123',
      };

      if (email === fakeAccount.email && password === fakeAccount.password) {
        Alert.alert("✅ 로그인 성공!", `${fakeAccount.email} 님 환영합니다!`);
        // 로그인 성공 시 HomeScreen으로 이동
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { username: fakeAccount.email } }],
        });
        return;
      }
      */

    // 백엔드 API 호출 (실제 로그인 로직)
    const response = await validateLogin(email, password);
    console.log("🟢 로그인 응답:", response);

    if (response?.message === "Login successful!") {
      Alert.alert("✅ 로그인 성공!", `${response.username} 님 환영합니다!`);

      // ✅ `reset()`을 사용하여 HomeScreen으로 이동하면서 params 전달
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { username: response.username } }],
      });

    } else {
      Alert.alert("⚠️ 로그인 실패", "이메일 또는 비밀번호가 잘못되었습니다.");
    }
  } catch (error) {
    Alert.alert("⚠️ 서버 오류", "로그인 중 오류가 발생했습니다.");
  }
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={keyboardVisible}>
          <ImageBackground 
            source={require('../../assets/LoginBackGround.png')}
            style={styles.background}
            resizeMode="cover"
            imageStyle={styles.imageStyle}
          >
            <View style={styles.container}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image source={require('../../assets/Logo_2.png')} style={styles.logo} />
              </TouchableOpacity>
              
              <Text style={styles.headerText}>환영해요!</Text>

              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="이메일 ~@.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="비밀번호"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>로그인</Text>
              </TouchableOpacity>

              <View style={styles.textContainer}>
                <View style={styles.textRow}>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.sideText, { textDecorationLine: 'underline' }]}>아이디/비번찾기</Text>
                  </TouchableOpacity>
                  <Text>  &  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.middleText, { textDecorationLine: 'underline' }]}>회원가입하기</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>©sprout.company</Text>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
