import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Vibration,
  Animated,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import styles from './RegisterMakeStyles';
import { checkUsernameAvailability, checkEmailAvailability } from "../../constants/auth";
import axios from "axios";
import { Alert } from "react-native";
const API_BASE_URL = "http://192.168.45.248:9090"; // ✅ PC의 IP 주소 사용

export default function RegisterMake({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [messages, setMessages] = useState({ username: '', email: '', password: '' });

  const [shakeUsername] = useState(new Animated.Value(0));
  const [shakeEmail] = useState(new Animated.Value(0));
  const [shakePassword] = useState(new Animated.Value(0));

  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const startShakeAnimation = (shakeAnimation) => {
    Vibration.vibrate(500);
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleCheckAvailability = async (type, value, shakeAnimation) => {
    if (!value.trim()) {
      setMessages((prev) => ({
        ...prev,
        [type]: `⚠️ ${type === "username" ? "유저 이름" : "이메일"}을 입력해주세요.`,
      }));
      startShakeAnimation(shakeAnimation);
      type === "username" ? setIsUsernameChecked(false) : setIsEmailChecked(false);

      return;
    }

    try {

      let isAvailable = false;

      if (type === "username") {
        isAvailable = await checkUsernameAvailability(value);
      } else if (type === "email") {
        isAvailable = await checkEmailAvailability(value);
      }

      console.log(`🟢 ${type} 중복 확인 응답:`, isAvailable);

      if (isAvailable) {
        setMessages((prev) => ({
          ...prev,
          [type]: `✅ 사용 가능한 ${type === "username" ? "유저 이름" : "이메일"}입니다.`,
        }));
        type === "username" ? setIsUsernameChecked(true) : setIsEmailChecked(true);
      } else {
        setMessages((prev) => ({
          ...prev,
          [type]: `❌ 이미 있는 ${type === "username" ? "유저 이름" : "이메일"}입니다.`,
        }));
        startShakeAnimation(shakeAnimation);
        type === "username" ? setIsUsernameChecked(false) : setIsEmailChecked(false);
      }
    } catch (error) {
      console.error(`⚠️ ${type} 중복 확인 오류:`, error.response?.data || error.message);
      setMessages((prev) => ({
        ...prev,
        [type]: "⚠️ 서버 오류 발생",
      }));
      type === "username" ? setIsUsernameChecked(false) : setIsEmailChecked(false);
    }
  };

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !passwordConfirmation.trim()) {
      Alert.alert("⚠️ 모든 정보를 채워주세요.");
      return;
    }

    if (!isUsernameChecked || !isEmailChecked) {
      Alert.alert("⚠️ 유저이름과 이메일 중복 확인을 완료하세요.");
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert("⚠️ 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      console.log("🟢 회원가입 요청 데이터:", { username, email, password });

      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        email,
        password
      });

      console.log("🟢 서버 응답:", response.data);

      // 백엔드가 success 필드를 반환하지 않는 경우 처리
      if (response.data.success || response.data === "User registered successfully!") {
        console.log("✅ 회원가입 성공!");
        navigation.navigate("RegisterComp");
      } else {
        console.error("❌ 회원가입 실패:", response.data);
        Alert.alert("❌ 회원가입 실패", response.data.message || response.data);
      }
    } catch (error) {
      console.error("⚠️ 서버 오류:", error.response?.data || error.message);
      Alert.alert("⚠️ 서버 오류 발생");

    }
  };

  const handlePasswordConfirmation = () => {
    if (!password.trim() || !passwordConfirmation.trim()) {

      setMessages((prev) => ({
        ...prev,
        password: "⚠️ 비밀번호를 입력해주세요.",
      }));
      startShakeAnimation(shakePassword);
      setIsPasswordChecked(false);
      return;
    }

    if (password === passwordConfirmation) {
      setMessages((prev) => ({
        ...prev,
        password: "✅ 비밀번호가 일치합니다.",
      }));
      setIsPasswordChecked(true);
    } else {
      setMessages((prev) => ({
        ...prev,
        password: "❌ 비밀번호가 일치하지 않습니다.",
      }));
      startShakeAnimation(shakePassword);
      setIsPasswordChecked(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -1}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { paddingVertical: 80 }]}
        scrollEnabled={isKeyboardVisible}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: -30, bottom: -30, left: -30, right: -30 }}
        >
          <Image source={require('../../assets/back_icon2.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <Image source={require('../../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>환영해요!</Text>

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.nameInput}
            placeholder="유저 이름"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setIsUsernameChecked(false);
            }}
          />

          <TouchableOpacity
            style={styles.checkButtonInside}
            onPress={() => handleCheckAvailability('username', username, shakeUsername)}
          >
            <Text style={styles.checkButtonText}>check</Text>
          </TouchableOpacity>
        </View>

        <Animated.Text style={[styles.messageText, { transform: [{ translateX: shakeUsername }] }]}>

          {messages.username}
        </Animated.Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="이메일"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setIsEmailChecked(false);
            }}
          />
          <TouchableOpacity
            style={styles.checkButtonInside}
            onPress={() => handleCheckAvailability('email', email, shakeEmail)}
          >
            <Text style={styles.checkButtonText}>check</Text>
          </TouchableOpacity>
        </View>
        <Animated.Text style={[styles.messageText, { transform: [{ translateX: shakeEmail }] }]}>
          {messages.email}
        </Animated.Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setIsPasswordChecked(false);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passwordConfirmationInput}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={passwordConfirmation}
            onChangeText={(text) => {
              setPasswordConfirmation(text);
              setIsPasswordChecked(false);
            }}
          />

          <TouchableOpacity style={styles.checkButtonInside} onPress={handlePasswordConfirmation}>
            <Text style={styles.checkButtonText}>check</Text>
          </TouchableOpacity>
        </View>

        <Animated.Text style={[styles.messageText, { transform: [{ translateX: shakePassword }] }]}>
          {messages.password}
        </Animated.Text>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>회원 가입!</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>©sprout.company</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
