import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunityScreen = () => (
  <View style={styles.container}>
    <Text>식물커뮤니티 화면</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#77CB4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityScreen;
