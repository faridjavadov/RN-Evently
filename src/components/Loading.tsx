import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#F68EAD" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F9FAEA'
  },
});

export default LoadingComponent;
