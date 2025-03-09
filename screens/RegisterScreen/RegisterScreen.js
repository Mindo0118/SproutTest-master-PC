import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  InteractionManager, 
  ActivityIndicator,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import styles from './RegisterScreenStyles';
import axios from 'axios'; // ✅ axios 추가

const API_BASE_URL = "http://192.168.45.248:9090"; // ✅ 백엔드 API 주소 설정

export default function RegisterScreen({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const [showIDModal, setShowIDModal] = useState(false); 
  const [showPWModal, setShowPWModal] = useState(false); 
  const [usernameForID, setUsernameForID] = useState(''); 
  const [emailForPW, setEmailForPW] = useState(''); 
  const [passwordResult, setPasswordResult] = useState('');
  const [emailResult, setEmailResult] = useState('');

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
    return () => task.cancel();
  }, []);

  if (!isReady) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // ✅ ID 찾기 기능 추가 (백엔드 API 연동)
  const handleFindID = async () => {
    if (usernameForID.trim() === '') {
      Alert.alert('⚠️ 오류', '유저명을 입력해주세요.');
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/find-email`, {
        params: { username: usernameForID },
      });
      setEmailResult(`이메일: ${response.data}`); // 백엔드에서 받은 이메일 표시
    } catch (error) {
      Alert.alert('⚠️ 오류', '해당 유저명을 찾을 수 없습니다.');
      setEmailResult('');
    }
  };

  // ✅ PW 찾기 기능 추가 (백엔드 API 연동) - 비밀번호 표시
  const handleFindPW = async () => {
    if (emailForPW.trim() === '') {
      Alert.alert('⚠️ 오류', '이메일을 입력해주세요.');
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/find-password`, {
        params: { email: emailForPW },
      });
      setPasswordResult(`비밀번호: ${response.data}`); // 백엔드에서 받은 비밀번호 표시
    } catch (error) {
      Alert.alert('⚠️ 오류', '해당 이메일을 찾을 수 없습니다.');
      setPasswordResult('');
    }
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <Image 
          source={require('../../assets/back_icon2.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* 로고 이미지 */}
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />

      {/* 로고 아래 텍스트 */}
      <Text style={styles.headerText}>식물을 잘 자라게 합니다</Text>

      {/* ID 찾기 버튼 */}
      <TouchableOpacity 
        style={styles.imageButton} 
        onPress={() => setShowIDModal(true)}
      >
        <Image source={require('../../assets/ID_button.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      {/* PW 찾기 버튼 */}
      <TouchableOpacity 
        style={styles.imageButton} 
        onPress={() => setShowPWModal(true)}
      >
        <Image source={require('../../assets/PW_button.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      {/* 버튼 아래 텍스트 */}
      <Text style={styles.infoText}>&</Text>

      {/* ✅ 회원가입 버튼 유지 */}
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("RegisterMake")}>
        <Text style={styles.buttonText}>이메일로 가입하기</Text>
      </TouchableOpacity>

      {/* 푸터 텍스트 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          sprout을 사용하시면, 저희 이용 약관 및 개인정보 보호 정책에 동의하시는 것으로 간주됩니다.
        </Text>
        <Text style={styles.footerText}>©sprout.company</Text>
      </View>

      {/* --- ID 찾기 모달 --- */}
      <Modal visible={showIDModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>아이디 찾기</Text>
            <TextInput 
              placeholder="가입했던 유저명을 입력하세요"
              style={styles.modalInput}
              value={usernameForID}
              onChangeText={setUsernameForID}
            />
            {emailResult !== '' && (
              <Text style={styles.modalResultText}>{emailResult}</Text>
            )}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalButton} onPress={handleFindID}>
                <Text style={styles.modalButtonText}>찾기</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => {
                  setShowIDModal(false);
                  setUsernameForID('');
                  setEmailResult('');
                }}
              >
                <Text style={styles.modalButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- PW 찾기 모달 --- */}
      <Modal visible={showPWModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>비밀번호 찾기</Text>
            <TextInput 
              placeholder="가입했던 이메일을 입력하세요"
              style={styles.modalInput}
              value={emailForPW}
              onChangeText={setEmailForPW}
            />
            {passwordResult !== '' && (
              <Text style={styles.modalResultText}>{passwordResult}</Text>
            )}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalButton} onPress={handleFindPW}>
                <Text style={styles.modalButtonText}>찾기</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => {
                  setShowPWModal(false);
                  setEmailForPW('');
                  setPasswordResult('');
                }}
              >
                <Text style={styles.modalButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
