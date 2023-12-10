import axios from 'axios';

const BASE_URL = 'https://api.weatherapi.com/v1';

export const API = axios.create({baseURL: BASE_URL});

export const apiKey = '809f47481801469ea0c114948230512';
