<template>
    <div>
        <div class="homepage__header">
            <h1 class="homepage__header-title">Quiz time</h1>
        </div>
        <div class="homepage__content">
            <div class="homepage__content-item homepage__content-item--active-player">
                <p>
                    Team In Play:
                    <span v-if="activePlayer.length <= 0">.....</span>
                    <span v-else>{{ activePlayer }}</span>
                    <span
                        class="answer"
                        v-if="isCorrect.length > 0"
                    >{{isCorrect === 'true' ? 'Correct' : 'Wrong' }}</span>
                </p>

                <div v-if="activePlayer.length > 0" class="homepage__answer-actions">
                    <button @click="answerValue('true')" class="btn btn__primary">Correct</button>
                    <button @click="answerValue('false')" class="btn btn__secondary">Wrong</button>
                </div>
            </div>

            <div class="homepage__content-item">
                <h2>Unlock buttons</h2>
                <p>
                    Click the this button to activate all player buttons. If
                    data has been cleared then click this button to reset and unlock player
                    buttons.
                </p>
                <button class="btn btn__primary" @click="resetBtns($event)">
                    <span v-if="!isLoading">Reset</span>
                    <span v-else>
                        <refresh-ccw-icon size="1.1x" class="loading"></refresh-ccw-icon>
                    </span>
                </button>
            </div>

            <div class="homepage__content-item">
                <h2>Clear player data button</h2>
                <p>
                    If a player needs to clear their data on there device then
                    use this button to activate the clear data button for a
                    users device.
                </p>
                <button class="btn btn__primary" @click="clearDataActivate($event, resetActive)">
                    <span v-if="!resetActive">Activate</span>
                    <span v-else>Deactivate</span> clear data
                </button>
            </div>

            <div class="homepage__content-item">
                <h2>Interactive lighting {{ BASE_ligthingActive ? 'Active' : 'Inactive'}}</h2>
                <p>BETA... Currently only available on localhost. Philips Hue interactive lighting. Activate to sync Philips Hue ligting.</p>
                <p>Status: {{lightsAvailable ? 'Available' : 'Unavailable'}}</p>
                <button
                    class="btn btn__primary"
                    @click="activateLighting(BASE_ligthingActive)"
                    :disabled="lightsAvailable !== true"
                    :class="lightsAvailable !== true ? 'btn--disabled': ''"
                >
                    <span v-if="!BASE_ligthingActive">Activate</span>
                    <span v-else>Deactivate</span> lighting
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import setFirestore, { setDataReset } from '../utils/firestore';
import { mapActions, mapGetters } from 'vuex';
import { firestore } from '../firebase';
import { RefreshCcwIcon } from 'vue-feather-icons';

export default {
    name: 'Homepage',
    components: {
        RefreshCcwIcon
    },
    computed: {
        ...mapGetters(['BASE_ligthingActive'])
    },
    created() {
        this.$api
            .get('lights/1')
            .then(response => {
                if (response) {
                    this.lightsAvailable = true;
                }
            })
            .catch(error => {
                return Promise.reject(error.response);
            });
        firestore
            .collection('resetData')
            .doc('reset')
            .onSnapshot(doc => {
                this.resetActive = doc.data().resetActive;
            });

        firestore
            .collection('active')
            .doc('activePlayer')
            .onSnapshot(doc => {
                this.activePlayer = doc.data().player;
            });

        firestore
            .collection('answerBoolean')
            .doc('answer')
            .onSnapshot(doc => {
                this.isCorrect = doc.data().correct;
            });
    },
    data() {
        return {
            resetActive: false,
            activePlayer: '',
            isCorrect: '',
            isLoading: false,
            lightsAvailable: false
        };
    },
    methods: {
        ...mapActions(['BASE_setInplay', 'BASE_setLightingActive']),

        resetBtns(event) {
            event.preventDefault();
            this.resetlLoading();
            const doc = 'activePlayer';
            setFirestore({ player: '' }, 'active', doc);
            setFirestore({ correct: '' }, 'answerBoolean', 'answer');
            this.$api
                .put('lights/1/state', { sat: 254, bri: 254, hue: 45535 })
                .catch(error => {
                    return Promise.reject(error.response);
                });
            this.BASE_setInplay(false);
        },
        clearDataActivate(event, value) {
            event.preventDefault();
            const doc = 'reset';
            setDataReset({ resetActive: !value }, 'resetData', doc);
        },
        answerValue(value) {
            const doc = 'answer';
            setFirestore({ correct: value }, 'answerBoolean', doc);
            console.log(value);
            if (this.BASE_ligthingActive) {
                const lightColor =
                    value === 'true'
                        ? { sat: 254, bri: 254, hue: 24000 }
                        : { sat: 254, bri: 254, hue: 100 };
                console.log(lightColor, value);

                this.$api.put('lights/1/state', lightColor).catch(error => {
                    return Promise.reject(error.response);
                });
            }
        },
        resetlLoading() {
            this.isLoading = true;

            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        getLights() {
            this.$api.put('lights/1/state', { on: true }).catch(error => {
                return Promise.reject(error.response);
            });
        },
        activateLighting(value) {
            this.BASE_setLightingActive(!value);

            if (!value) {
                this.getLights();
            } else {
                this.$api
                    .put('lights/1/state', {
                        on: false,
                        sat: 254,
                        bri: 254,
                        hue: 45535
                    })
                    .catch(error => {
                        return Promise.reject(error.response);
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import './../styles/partials/_variables.scss';
@import './../styles/partials/_mixins.scss';

.homepage {
    &__header {
        background: $deep-blue;
        padding: 20px;
    }

    &__header-title {
        color: $white;
        font-size: 48px;
    }

    &__content {
        width: 100%;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;

        @include screen(sm) {
            width: 70%;
            margin: auto;
            padding-top: 40px;
        }
    }

    &__answer-actions {
        width: 50%;
        display: flex;
        justify-content: space-between;

        button {
            margin-right: 10px;
        }
    }

    &__content-item {
        width: 100%;
        padding: 20px;
        background: $purple-heart;
        flex-basis: 100%;
        margin-bottom: 20px;

        h2,
        p {
            color: $white;
        }

        @include screen(sm) {
            width: 48%;
            flex-basis: 48%;
            margin-right: 2%;
        }

        &--active-player {
            p {
                font-size: 20px;
            }

            span {
                font-weight: 700;

                &.answer {
                    font-weight: 300;
                }
            }

            @include screen(sm) {
                width: 100%;
                flex-basis: 100%;

                p {
                    font-size: 24px;
                }
            }
        }
    }
}

.loading {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
</style>
