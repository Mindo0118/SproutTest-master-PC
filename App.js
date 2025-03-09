import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import Navigation from './navigation/Navigation';  // 네비게이션 import
import { validateLogin, registerUser } from './constants/auth'; // ✅ 로그인 & 회원가입 API


// setImmediate 폴리필 추가
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (fn) => setTimeout(fn, 0);
}

enableScreens(); // 네이티브 스크린 최적화 활성화

export default function App() {
  return <Navigation />;
}
