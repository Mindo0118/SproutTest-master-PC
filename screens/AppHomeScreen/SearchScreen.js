import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchScreen = () => (
  <View style={styles.container}>
    <Text>식물도감 화면</Text>
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

export default SearchScreen;
