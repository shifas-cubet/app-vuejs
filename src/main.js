import { createApp } from 'vue'
import App from './App.vue'
import './index.css';

import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'

import axiosPlugin from '@/plugins/axios';

import store from '@/store/index.js';

import uppercase from './directives/uppercase';


// import UserComponent from '@/components/UserComponent.vue';
// import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import CreateUser from '@/components/CreateUser.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Home.vue')
      },
      {
        path: '/user/:id',
        name: 'User',
        component: () => import('@/components/UserComponent.vue'),
        props: true
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        props: true
      },
      {
        path: '/create-user',
        name: 'User-Create',
        component: CreateUser
      },
      {
        path: '/edit-user/:id',
        name: 'Edit-User',
        component: CreateUser,
        props: true 
      }
    ]
  })

  // Vue.directive('uppercase', uppercase);
  
  createApp(App)
  .directive('uppercase', uppercase)
  .use(router)
  .use(store)
  .use(axiosPlugin)
  .mount('#app')
