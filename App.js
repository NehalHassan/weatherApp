import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherApp from './src/app';

export default class App extends React.Component {
  render() {
    return (
      <WeatherApp />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
