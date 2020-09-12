import axios from 'axios';

import store from '../store/base';

const api = axios.create({
    baseURL: `https://192.168.0.10/api/Q5Bs9xmyE4g9uFWdqATJoOwzNV2YZ0Tj4fzsKcNW/`,
    crossDomain: true,
    contentType: false,
    responseType: 'json',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;
