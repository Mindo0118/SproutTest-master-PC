import { StyleSheet, Dimensions, Platform } from "react-native";

// 화면 크기 가져오기
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    homeButton: {
        position: "absolute",
        top: height * 0.06, // 화면 높이에 비례한 위치
        left: width * 0.05, // 화면 너비에 비례한 위치
        zIndex: 1,
    },
    homeIcon: {
        width: 27,
        height: 27,
        resizeMode: "contain",
    },
    pagerView: {
        width: width - 1,
        height: height * 0.65,
        marginTop: height * 0.08,
        alignSelf: "center",
    },
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 0,
        marginTop: Platform.OS === 'ios' ? height * 0.01 : height * 0.02,
        bottom: 10,
        height: height * 0.8,
    },
    pageText: {
        color: '#438E1A',
        fontSize: 35,
        fontWeight: "medium",
        position: "absolute",
        top: Platform.OS === 'ios' ? height * -0.014 : height * 0.002,
        left: width * 0.07,
        zIndex: 2,
    },
    pageText2: {
        color: '#438E1A',
        fontSize: 35,
        fontWeight: "medium",
        position: "absolute",
        top: Platform.OS === 'ios' ? height * 0.04 : height * 0.053,
        left: width * 0.07,
        zIndex: 2,
    },
    pageText3: {
        color: '#94BF7D',
        fontSize: 20,
        fontWeight: "medium",
        position: "absolute",
        top: height * 0.107,
        left: width * 0.07,
        zIndex: 2,
    },
    buttonContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * -0.04,
    },
    button1: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        marginBottom: height * 0.05,
        width: width * 0.92,
        height: height * 0.19,
        top: Platform.OS === 'ios' ? height * -0.25 : height * -0.17,
    },
    button2: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        width: width * 0.92,
        height: height * 0.19,
        bottom: Platform.OS === 'ios' ? height * -0.08 : height * -0.16,
    },
    button3: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        width: width * 0.92,
        height: height * 0.19,
        bottom: Platform.OS === 'ios' ? height * -0.22 : height * -0.30,
    },

    buttonContainer3: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: Platform.OS === 'ios' ? height * -0.1 : height * -0.55,
    },
    button3_1: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        width: width * 0.92,
        height: height * 0.19,
        bottom: Platform.OS === 'ios' ? height * -0.001 : height * -0.30,
    },
    button3_2: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        width: width * 0.92,
        height: height * 0.19,
        bottom: Platform.OS === 'ios' ? height * -0.1 : height * -0.4,
    },
    button3_3: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        width: width * 0.92,
        height: height * 0.19,
        bottom: Platform.OS === 'ios' ? height * -0.2 : height * -0.5,
    },
    
    buttonImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: height * 0.003,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    // 컨테이너 스타일 수정
    bottomButtonContainer: {
        flexDirection: "row",
        justifyContent: "flex-start", // 버튼을 왼쪽에 정렬
        alignItems: "center", // 수직 중앙 정렬
        marginTop: 1, // 필요 시 위쪽 여백 조정
    },
    skipButton: {
        alignSelf: "center",
        marginTop: height * 0.0000001,
        height: 100,
        paddingHorizontal: 30,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    skipIcon: {
        width: width * 0.4,
        height: height * 0.23,
        resizeMode: "contain",
    },

    // agreeButton 스타일
    agreeButton: {
        alignSelf: "center",
        left: 60,
        marginTop: height * 0.0000001,
        marginLeft: -51.5,
        height: 100,
        paddingHorizontal: 30,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",

    },
    agreeIcon: {
        width: width * 0.4,
        height: height * 0.23,
        resizeMode: "contain",
    },

    ///////안내 문구////////
    textContainer: {
        position: "absolute",
        bottom: 100, // 인디케이터 위쪽 여백 조절
        alignSelf: "center",
        alignItems: "center", // 가운데 정렬
    },
    hahaText1: {
        fontSize: 18,
        color: "#80B364",
    },
    hahaText2: {
        fontSize: 18,
        color: "#80B364",
    },
    ////////////////////////

    ImageAlarm: {
        width: Platform.OS === 'ios' ? 250 : 310,
        height: Platform.OS === 'ios' ? 500 : 600,
        top: Platform.OS === 'ios' ? -19 : 17,
        left: Platform.OS === 'ios' ? -2 : 0,
        bottom: Platform.OS === 'ios' ? 0 : 0,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "contain",
    },
    logo: {
        position: "absolute",
        width: 1500,
        height: 300,
        top: Platform.OS === 'ios' ? -5 : 90,
    },
    text5: {
        //position: "absolute",
        color: '#438E1A',
        fontSize: 25,
        fontWeight: 'medium',
        marginTop:  Platform.OS === 'ios' ? 100 : 260,
        textAlign: "center", // 텍스트 가운데 정렬
    },
    footer: {
        position: "absolute",
        bottom: height * 0.02,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    footerText: {
        fontSize: 13,
        color: "#CCCCCC",
    },
});

export default styles;
