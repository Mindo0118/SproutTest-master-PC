import axios from "axios";

// ✅ API 요청할 기본 URL 설정 (PC의 실제 IP 주소 사용)
const API_BASE_URL = "http://192.168.45.248:9090"; // ✅ 백엔드 실행 IP

// ✅ 로그인 요청 함수
export const validateLogin = async (email, password) => {
  try {
    console.log(`🟢 로그인 요청: ${API_BASE_URL}/auth/login`);

    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { email: email, password } // ✅ email 필드 사용
    );

    console.log("🟢 로그인 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("⚠️ 로그인 요청 실패!", error.response?.data || error.message);
    return "Server error";
  }
};

// ✅ 유저네임 중복 체크 API
export const checkUsernameAvailability = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/check-username`, {
      params: { username },
    });
    return response.data.available; // 서버에서 { available: true/false } 반환
  } catch (error) {
    console.error("⚠️ 유저네임 중복 체크 오류:", error);
    return false; // 기본적으로 중복된 것으로 처리
  }
};

// ✅ 이메일 중복 체크 API
export const checkEmailAvailability = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/check-email`, {
      params: { email },
    });
    return response.data.available; // 서버에서 { available: true/false } 반환
  } catch (error) {
    console.error("⚠️ 이메일 중복 체크 오류:", error);
    return false; // 기본적으로 중복된 것으로 처리
  }
};

// ✅ 회원가입 요청 API
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      { username, email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("⚠️ 회원가입 요청 실패:", error.response?.data || error.message);
    return "Server error";
  }
};

// ✅ 아이디 찾기 요청 (유저네임 입력 → 이메일 반환)
export const findEmail = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/find-email`, {
      params: { username },
    });
    return response.data;
  } catch (error) {
    return "⚠️ 해당 유저명을 찾을 수 없습니다.";
  }
};

// ✅ 비밀번호 찾기 요청 (이메일 입력 → 비밀번호 반환)
export const findPassword = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/find-password`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    return "⚠️ 해당 이메일을 찾을 수 없습니다.";
  }
};
