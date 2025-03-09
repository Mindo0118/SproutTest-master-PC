
import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Pressable, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TemperatureChart from './TemperatureChart';
import SoilMoistureChart from './SoilMoistureChart';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const iconSize = screenWidth * 0.164;

const { width, height } = Dimensions.get("window");
const topMargin2 = (422 / 2900) * height;
const chartSize = (335 / 362) * width;

const circleSize = screenWidth * 0.66;
const imageSize = circleSize * 0.75;
const imageTopMargin = circleSize * (55 / 310);

export default function MyPlantsScreen({ navigation }) {
  const sideMenuBarTop = width * 0.21;
  const sideMenuBarRight = height * 0.02;
  const leftMargin = width * 0.069;
  const topMargin = height * 0.088;

  const [image, setImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const lastTapRef = useRef(0);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('이미지 라이브러리 접근 권한이 필요합니다!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ['Images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleImageTap = () => {
    if (!image) return; // 이미지가 없으면 터치 이벤트 없음
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTapRef.current && now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      setShowDeleteModal(true);
    } else {
      lastTapRef.current = now;
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    setImage(null);
    setShowDeleteModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.plantContainer, { left: leftMargin, top: topMargin }]}>
        <View style={[styles.circleContainer, { width: screenWidth * 0.66, height: screenWidth * 0.66, borderRadius: screenWidth * 0.66 / 2 }]}>
          <Pressable
            style={[
              styles.imageContainer,
              { borderColor: image ? "#4C9923" : "#E9F7E2" }
            ]}
            onPress={handleImageTap}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.image}
              />
            ) : (
              <Image
                source={require('../../assets/Logo_3.png')}
                style={styles.nonimage}
              />
            )}
          </Pressable>
          <View style={[styles.outerCircle, { position: 'absolute', top: 4, right: 16 }]}>
            <TouchableOpacity onPress={selectImage} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>나의 식물</Text>
        </View>
      </View>

      {/* 차트 컨테이너 */}
      <View style={[styles.chartWrapper, { top: topMargin2, width: chartSize, height: chartSize }]}>
        <View style={[styles.chartContainer, { width: chartSize, height: chartSize }]}>
          <TemperatureChart temperature={20} />
          <SoilMoistureChart />
        </View>
      </View>

      <View style={[styles.sideMenuBar, { top: sideMenuBarTop, right: sideMenuBarRight }]}>
        <TouchableOpacity style={styles.menuButton}>
          <Image source={require("../../assets/User.png")} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Image source={require("../../assets/message.png")} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Image source={require("../../assets/IOT.png")} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      {/* 커스텀 모달 (iOS Alert 스타일 유사) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.alertBox}>
            {/* 제목과 내용 */}
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Delete image</Text>
              <Text style={styles.alertMessage}>
                이 이미지를 삭제하면 {'\n'}되돌릴 수 없습니다.
              </Text>
            </View>

            {/* 구분선(가로) */}
            <View style={styles.dividerLine} />

            {/* 버튼 영역 (가로 배치) */}
            <View style={styles.buttonRow}>
              {/* 취소 버튼 */}
              <TouchableOpacity
                style={[styles.actionButton, styles.leftButton]}
                onPress={handleCancelDelete}
                activeOpacity={0.7}
              >
                <Text style={[styles.actionButtonText, { color: '#007AFF' }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              {/* 세로 구분선 */}
              <View style={styles.verticalDivider} />

              {/* 삭제 버튼 */}
              <TouchableOpacity
                style={[styles.actionButton, styles.rightButton]}
                onPress={handleConfirmDelete}
                activeOpacity={0.7}
              >
                <Text style={[styles.actionButtonText2, { color: '#FF3B30' }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#77CB4A",
    alignItems: "center",
    justifyContent: "center",
  },
  plantContainer: {
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  circleContainer: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: "#E9F7E2",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "absolute",
    top: imageTopMargin,
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    overflow: "hidden",
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nonimage: {
    width: '85%',
    height: '72%',
    resizeMode: 'cover',
  },
  outerCircle: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: '#E9F7E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#4C9923',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  labelContainer: {
    position: "absolute",
    top: 15,
    backgroundColor: "#4C9923",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
  label: {
    color: "#E9F7E2",
    fontWeight: "bold",
  },
  chartWrapper: {
    zIndex: 0,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    backgroundColor: "#589F46",
    borderRadius: 250,
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  chartContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  sideMenuBar: {
    position: "absolute",
    backgroundColor: "#579D45",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
  },
  menuButton: {
    width: screenWidth * 0.16,
    height: screenWidth * 0.13,
    borderRadius: screenWidth * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  menuIcon: {
    width: iconSize,
    height: iconSize,
    resizeMode: "contain",
  },
  // 커스텀 Modal 스타일
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // 배경 반투명 처리
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  // iOS Alert 스타일에 맞춰 추가된/변경된 부분
  alertBox: {
    width: '65%',
    backgroundColor: '#D6D6D6',
    borderRadius: 16,
    overflow: 'hidden',
    // 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // 안드로이드
  },
  alertContent: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  alertMessage: {
    marginBottom: 5,
    fontSize: 13,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 17, // 기본값보다 큰 값으로 설정
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#868588',
  },
  buttonRow: {
    flexDirection: 'row',
    height: 44,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#868588',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: 'medium',
  },
  actionButtonText2: {
    fontSize: 17,
    fontWeight: '500',
  },
  leftButton: {
    borderBottomLeftRadius: 12,
  },
  rightButton: {
    borderBottomRightRadius: 12,
  },
});
