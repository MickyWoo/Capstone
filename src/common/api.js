// Base API Configuration



// Base API Configuration

import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://newsapi.org/v2',
});

API.interceptors.request.use(function (config) {
    config.params.APPID = 'f702b0d64e0f48b5809e0c8db7c9a399';
 

    return config;

    },
function (error) {
    return Promise.reject(error);
    
});
