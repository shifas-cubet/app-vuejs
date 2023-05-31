import { createRouter, createWebHistory } from 'vue-router';
import {PlanetComponent} from './components/PlanetComponent.vue';
import { Home } from './components/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/planet/:id',
        name: 'Planet',
        component: PlanetComponent,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;