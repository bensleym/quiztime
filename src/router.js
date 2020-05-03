import Vue from 'vue';
import Router from 'vue-router';

import Homepage from './views/Homepage.vue';
import PlayerOne from './views/PlayerOne.vue';
import PlayerTwo from './views/PlayerTwo.vue';
import Player from './views/Player.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            name: 'Root',
            path: '/',
            component: Homepage
        },
        {
            name: 'Player One',
            path: '/players/playerone',
            component: PlayerOne
        },
        {
            name: 'Player Two',
            path: '/players/playertwo',
            component: PlayerTwo
        },
        {
            name: 'Player',
            path: '/player',
            component: Player
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

export default router;
