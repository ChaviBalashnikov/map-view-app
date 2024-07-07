import axios from "axios";
const BASE_RAPID_URL = "https://vanitysoft-boundaries-io-v1.p.rapidapi.com/reaperfire/rest/v1/public";
const RAPID_KEY = "ddda90127emsha26a318bdbe6ce2p1f3c55jsnb8fd2a2761ba";
const WEATHER_KEY = "0c4f6253d0cc437da2a205158240607&q";

export const getBoundaryByZipcode = async (zipCode) => {
    const {
        data
    } = await axios.get(`${BASE_RAPID_URL}/boundary?zipcode=${zipCode}%2C20003%2C20019%2C20015%2C20854%20HTTP/1.1`, {
        headers: {
            "x-rapidapi-key": RAPID_KEY,
            "x-rapidapi-host": "vanitysoft-boundaries-io-v1.p.rapidapi.com"
        }
    });
    return data
};


export const getWeatherByZipcode = async (zipCode) => {
    const {
        data
    } = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}=${zipCode}`);
    return data
};