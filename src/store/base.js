import SecureLS from 'secure-ls';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const ls = new SecureLS({ isCompression: false });

const store = new Vuex.Store({
    state: {
        playerName: '',
        inplay: ''
    },
    getters: {
        BASE_playerName: state => state.playerName,
        BASE_inplay: state => state.inplay
    },
    mutations: {
        MUTATE_PLAYER_NAME(state, value) {
            state.playerName = value;
        },
        MUTATE_IN_PLAY(state, value) {
            state.inplay = value;
        }
    },
    actions: {
        BASE_setPlayerName({ commit }, payload) {
            commit('MUTATE_PLAYER_NAME', payload);
        },
        BASE_setInplay({ commit }, payload) {
            commit('MUTATE_IN_PLAY', payload);
        }
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            }
        })
    ]
});

export default store;
