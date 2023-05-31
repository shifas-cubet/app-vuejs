import { createStore } from 'vuex';
import config from '@/config';
import axios from 'axios';

export default createStore({
    modules: {
        auth: {
            namespaced: true,
            state: () => ({
                token: localStorage.getItem('token') || '',
                status: ''
            }),
            mutations: {
                authRequest(state) {
                    state.status = 'loading'
                },
                authSuccess(state, token) {
                    state.status = 'success';
                    state.token = token
                },
                authError(state) {
                    state.status = 'error';
                }
            },
            actions: {
                async login({commit}, {email, password}) {
                    commit('authRequest');
                    try {
                        const response = await axios.post(`${config.regressAPIBaseURL}/api/login`, {email, password});
                        const token = response.data.token;
                        commit('authSuccess', token);
                        localStorage.setItem('token', token);
                    } catch (error) {
                        commit('authError');
                        localStorage.removeItem('token');
                        throw error;
                    }
                }
            },
            getters: {
                isAuthenticated: (state) => !!state.token
            }
        }
    }

});