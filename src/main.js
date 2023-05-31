import { createApp } from 'vue'
import App from './App.vue'
import './index.css';

import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'

import axiosPlugin from '@/plugins/axios';

import store from '@/store/index.js';

import UserComponent from '@/components/UserComponent.vue';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/user/:id',
        name: 'User',
        component: UserComponent,
        props: true
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        props: true
      }
    ]
  })
  
  createApp(App)
  .use(router)
  .use(store)
  .use(axiosPlugin)
  .mount('#app')
