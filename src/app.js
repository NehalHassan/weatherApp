import React, {Component} from 'react';
import {
  StyleSheet, Text, View, Platform, TextInput, ActivityIndicator, KeyboardAvoidingView,
  StatusBar, ImageBackground, ScrollView
} from 'react-native';
import { fetchWeather, fetchLocationId } from './api';
import {getImageForWeather} from './helpers'

const upperCaseText = text => {
  return text[0].toUpperCase() + text.toLowerCase().slice(1)
}

const renderWeather = state => {
  const {city, temperature, weather} = state;
  return (
    <>
    <Text style={[styles.largeText, styles.textStyle]}>{upperCaseText(city)}</Text>
    <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
    <Text style={[styles.largeText, styles.textStyle]}>{Math.round(temperature)}°c</Text>
    </>
  );
}
export default class WeatherApp extends Component {

  state = {
    loading: false,
    weather: '',
    location:'london',
    city: 'london',
    temperature: 0,
  }

  fetchWeatherData = () => {
    this.setState({loading: true})
    fetchLocationId(this.state.location).then(
      response => response.data && fetchWeather(response.data[0].woeid).then(
        response => {
          console.log(response.data,'response')
          this.setState({
            weather: response.data.consolidated_weather[0].weather_state_name,
            loading: false,
            temperature: response.data.consolidated_weather[0].the_temp
          })}
      )
    ).catch(error => {
      this.setState({
        loading: false,
        weather:'',
        error
      })
    })
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  onChangeText = event => {
    this.setState({location: event})
  }

  onSubmit = () => {
    this.fetchWeatherData();
    this.setState(({location}) => ({city: location}))
  }

  renderContent = () => {
    const { error } = this.state;
    if (error) {
      return (
        <Text style={[styles.textStyle, styles.error, styles.marginBottom]}>
        Could not load weather, please try a different city.
        </Text>
      )
    } else {
      return renderWeather(this.state)
    }
  }

  render() {
    console.log(this.state,'weatherData')
    const { loading, weather } = this.state;
    const backgroundImage = getImageForWeather(weather) || './assets/sunny.jpg' ;

    return (
      <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode="interactive"
      >
        <StatusBar barStyle="light-content" />
        <ImageBackground
        source={require('./assets/sunny.jpg' )}
        style={styles.imageContainer}
        imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <View style={styles.textWrapper}>
              <ActivityIndicator style={styles.marginBottom} animating={loading} color="gray" size="large" />
              {!loading && this.renderContent()}
            </View>
            <KeyboardAvoidingView
            behavior="padding" >
              <TextInput
                  style={styles.textInput}
                  onChangeText={this.onChangeText}
                  onSubmitEditing={this.onSubmit}
                  value={this.state.location}
                  clearButtonMode="always"
                  placeholder="Search any city"
              />
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  textWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
      fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    height: 40,
    width: '70%',
    padding: 12,
    backgroundColor: 'gray',
    color: '#fff',
    borderRadius: Platform.OS === 'ios' ? 0 : 12
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  error: {
    color : 'red',
    width: '80%',
    fontSize: 14,
    textAlign: 'center',
  },
  marginBottom: {
    marginBottom: 12
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
