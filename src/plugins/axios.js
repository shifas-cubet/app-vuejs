import axios from 'axios';

export default {
  install: (app) => {

    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if(token) {
                config.headers.Authorization = `${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    app.config.globalProperties.$axios = axios;

    app.provide('axios', axios);
  },
};
