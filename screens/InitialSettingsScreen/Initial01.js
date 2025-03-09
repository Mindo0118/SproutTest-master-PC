import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, SafeAreaView, Alert } from "react-native";
import LottieView from "lottie-react-native";
import PagerView from "react-native-pager-view";
import { useNavigation } from "@react-navigation/native";
import styles from "./Initial01Styles"; // 스타일 파일 임포트

const { width, height } = Dimensions.get("window");

const Initial01 = () => {
    const navigation = useNavigation();
    const [pageIndex, setPageIndex] = useState(0);
    const pagerRef = useRef(null);
    const lottieRef = useRef(null); // LottieView에 대한 ref 추가

    const goToNextPage = (nextPageIndex) => {
        if (pagerRef.current) {
            pagerRef.current.setPage(nextPageIndex);
        }
        setPageIndex(nextPageIndex);

        // 5번째 페이지로 이동할 때 Lottie 애니메이션 재생
        if (nextPageIndex === 4 && lottieRef.current) {
            lottieRef.current.play();
        }
    };

    // agree 버튼 클릭 시 동작
    const onAgreePress = () => {
        if (pageIndex === 3) { // 4번째 페이지일 때
            Alert.alert(
                "알림",
                "'sprout'에서 알림을 보내고자 합니다.",
                [
                    {
                        text: "동의",
                        onPress: () => goToNextPage(pageIndex + 1),
                    },
                    {
                        text: "동의안함",
                        onPress: () => { },
                        style: "cancel",
                    },
                ]
            );
        } else {
            Alert.alert("알림", "동의했습니다.", [{ text: "확인", onPress: () => goToNextPage(pageIndex + 1) }]);
        }
    };

    // skip 버튼 클릭 시 동작
    const onSkipPress = () => {
        if (lottieRef.current) {
            lottieRef.current.play();
        }
        goToNextPage(4);
    };

    // 5번째 화면이면 로띠 애니메이션 실행 및 3초 후 AppHomeScreen으로 이동
    useEffect(() => {
        if (pageIndex === 4) {
            // 스와이프 등으로 5번째 페이지에 도달해도 로띠 애니메이션 실행
            if (lottieRef.current) {
                lottieRef.current.play();
            }
            const timer = setTimeout(() => {
                navigation.navigate("AppHomeScreen");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [pageIndex, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            {/* 상단 Home 버튼 */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={styles.homeButton}
            >
                <Image source={require("../../assets/back_icon2.png")} style={styles.homeIcon} />
            </TouchableOpacity>

            <PagerView
                ref={pagerRef}
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
                pageMargin={10}
                orientation="horizontal"
            >
                {/* 1번째 페이지 */}
                <View key="1" style={styles.page}>
                    <Text style={styles.pageText}>식물 돌보기에 얼마나</Text>
                    <Text style={styles.pageText2}>관심이 많으세요?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button1} onPress={() => goToNextPage(1)}>
                            <Image source={require("../../assets/Lowbt.png")} style={styles.buttonImage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={() => goToNextPage(1)}>
                            <Image source={require("../../assets/Midbt.png")} style={styles.buttonImage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button3} onPress={() => goToNextPage(1)}>
                            <Image source={require("../../assets/Highbt.png")} style={styles.buttonImage} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 2번째 페이지 */}
                <View key="2" style={styles.page}>
                    <Text style={styles.pageText}>식물에 물을 얼마나</Text>
                    <Text style={styles.pageText2}>자주 줄 수 있나요?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button1} onPress={() => goToNextPage(2)}>
                            <Image source={require("../../assets/Waterbt01.png")} style={styles.buttonImage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={() => goToNextPage(2)}>
                            <Image source={require("../../assets/Waterbt02.png")} style={styles.buttonImage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button3} onPress={() => goToNextPage(2)}>
                            <Image source={require("../../assets/Waterbt03.png")} style={styles.buttonImage} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 3번째 페이지 */}
                <View key="3" style={styles.page}>
                    <Text style={styles.pageText}>식물을 어디에</Text>
                    <Text style={styles.pageText2}>두고 싶으세요?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button1} onPress={() => goToNextPage(3)}>
                            <Image source={require("../../assets/indoorBt.png")} style={styles.buttonImage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={() => goToNextPage(3)}>
                            <Image source={require("../../assets/verandaBt.png")} style={styles.buttonImage} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button3} onPress={() => goToNextPage(3)}>
                            <Image source={require("../../assets/outdoorBt.png")} style={styles.buttonImage} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 4번째 페이지 */}
                <View key="4" style={styles.page}>
                    <Text style={styles.pageText}>미리 알림을</Text>
                    <Text style={styles.pageText2}>받으시겠어요?</Text>
                    <View style={styles.ImageAlarm}>
                        <Image source={require("../../assets/ImageAlarm.png")} style={styles.ImageAlarm} />
                    </View>
                </View>

                {/* 5번째 페이지 */}
                <View key="5" style={styles.page}>
                    <LottieView
                        ref={lottieRef}
                        source={require("../../assets/Logo4.json")}
                        autoPlay={false}
                        loop={false}
                        style={styles.logo}
                    />
                    <Text style={styles.text5}>시작해요!</Text>
                </View>
            </PagerView>

            {/* 인디케이터 */}
            <View style={styles.pagination}>
                {[0, 1, 2, 3, 4].map((index) => (
                    <View
                        key={index}
                        style={[styles.dot, { backgroundColor: pageIndex === index ? "#438E1A" : "#EEF3EB" }]}
                    />
                ))}
            </View>

            {/* 1, 2, 3번째 페이지에서만 표시되는 텍스트 */}
            {(pageIndex === 0 || pageIndex === 1 || pageIndex === 2) && (
                <View style={styles.textContainer}>
                    <Text style={styles.hahaText1}>답변을 주신 내용을 분석하여</Text>
                    <Text style={styles.hahaText2}>식물을 추천드릴게요</Text>
                </View>
            )}


            {/* 4번째 화면에서만 skip 버튼을 표시 */}
            {pageIndex === 3 && (
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity
                        onPress={onAgreePress}
                        style={styles.agreeButton}
                    >
                        <Image
                            source={require("../../assets/agree_icon.png")}
                            style={styles.agreeIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onSkipPress}
                        style={styles.skipButton}
                        hitSlop={{ top: -90, bottom: -90, left: -40, right: -40 }}
                    >
                        <Image source={require("../../assets/skipButton.png")} style={styles.skipIcon} />
                    </TouchableOpacity>
                </View>
            )}

            {/* 푸터 */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>©sprout.company</Text>
            </View>
        </SafeAreaView>
    );
};

export default Initial01;
