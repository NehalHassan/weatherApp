import axios from "axios";

const api = 'https://www.metaweather.com/api/location';

export const fetchWeather = id => axios.get(`${api}/${id}/`)

export const fetchLocationId = city => axios.get(`${api}/search/?query=${city}`)
