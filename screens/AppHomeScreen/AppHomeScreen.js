import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, PanResponder } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPlantsScreen from './MyPlantsScreen';
import SearchScreen from './SearchScreen';
import DiaryScreen from './DiaryScreen';
import CommunityScreen from './CommunityScreen';


const Tab = createBottomTabNavigator();

// 커스텀 탭바 컴포넌트
const CustomTabBar = ({ state, descriptors, navigation, tabVisible }) => {
  if (!tabVisible) {
    const activeRoute = state.routes[state.index];
    const { options } = descriptors[activeRoute.key];
    return (
      <View style={styles.tabBarHiddenContainer}>
        <View style={[styles.tabItem, styles.activeTabBox]}>
          {options.tabBarIcon ? options.tabBarIcon({ focused: true, color: '#FFFFFF' }) : null}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tabItem, isFocused && styles.activeTabBox]}
            onPress={() => navigation.navigate(route.name)} // 탭 아이콘 클릭 시 해당 화면으로 이동
          >
            {options.tabBarIcon
              ? options.tabBarIcon({ focused: isFocused, color: isFocused ? '#FFFFFF' : '#12491E' })
              : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const AppHomeScreen = ({ navigation }) => {
  const [tabVisible, setTabVisible] = useState(true);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 100) {
          setTabVisible(false);  // 탭바 숨기기
        } else if (gestureState.dy < -100) {
          setTabVisible(true);  // 탭바 보이기
        }
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },  // 기본 탭바 스타일 숨기기
        }}
        tabBar={(props) => <CustomTabBar {...props} tabVisible={tabVisible} />}
      >
        <Tab.Screen
          name="MyPlants"
          component={MyPlantsScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require('../../assets/home.png')}
                style={[styles.tabIcon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require('../../assets/search.png')}
                style={[styles.tabIcon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Diary"
          component={DiaryScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require('../../assets/diary.png')}
                style={[styles.tabIcon, { tintColor: color }]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require('../../assets/community.png')}
                style={[styles.tabIcon, { tintColor: color }]}
              />
            ),
          }}
        />
      </Tab.Navigator>

    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#589F46',
    height: 77,
    borderRadius: 38,
    marginHorizontal: 3,
    marginBottom: 25,
    paddingHorizontal: 9,
    paddingTop: 18,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 33,
    right: 33,
    elevation: 0,
    zIndex: 0,
  },
  tabBarHiddenContainer: {
    position: 'absolute',
    bottom: 0,
    left: 33,
    right: 33,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'none',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 35,
    height: 35,
    transform: [{ scale: 1.1 }],
  },
  activeTabBox: {
    backgroundColor: '#32720F',
    borderRadius: 35,
    height: 60,
    bottom: 10,
    padding: 2,
  },
  selectImageButton: {
    position: 'absolute',
    bottom: 120,
    left: '50%',
    transform: [{ translateX: -100 }],
    backgroundColor: '#32720F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  selectImageText: {
    color: 'white',
    fontSize: 16,
  },
  navigateToMyPlantsButton: {
    position: 'absolute',
    bottom: 70,
    left: '50%',
    transform: [{ translateX: -120 }],
    backgroundColor: '#32720F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  navigateToMyPlantsText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AppHomeScreen;
