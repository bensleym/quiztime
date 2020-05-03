<template>
    <div>
        <div class="homepage__header">
            <h1 class="homepage__header-title">Quiz time</h1>
        </div>

        <div class="homepage__content">
            <div
                class="homepage__content-item homepage__content-item--active-player"
            >
                <p>
                    Team In Play:
                    <span v-if="activePlayer.length <= 0">.....</span>
                    <span v-else>{{ activePlayer }}</span>
                </p>
            </div>

            <div class="homepage__content-item">
                <h2>Reset buttons</h2>
                <p>
                    Click the this button to activate all player buttons. If
                    data is cleared then also click this button to reset player
                    buttons
                </p>
                <button class="btn btn__primary" @click="resetBtns($event)">
                    Reset
                </button>
            </div>

            <div class="homepage__content-item">
                <h2>Clear player data button</h2>
                <p>
                    If a player needs to clear their data on there device then
                    use this button to activate the clear data button for a
                    users device
                </p>
                <button
                    class="btn btn__primary"
                    @click="clearDataActivate($event, resetActive)"
                >
                    <span v-if="!resetActive">Activate</span>
                    <span v-else>Deactivate</span> clear data
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import setFirestore, { setDataReset } from '../utils/firestore';
import { mapActions, mapGetters } from 'vuex';
import { firestore } from '../firebase';

export default {
    name: 'Homepage',
    created() {
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
    },
    data() {
        return {
            resetActive: false,
            activePlayer: ''
        };
    },
    methods: {
        ...mapActions(['BASE_setInplay']),

        resetBtns(event) {
            event.preventDefault();
            const doc = 'activePlayer';
            setFirestore({ player: '' }, 'active', doc);
            this.BASE_setInplay(false);
        },
        clearDataActivate(event, value) {
            event.preventDefault();
            const doc = 'reset';
            setDataReset({ resetActive: !value }, 'resetData', doc);
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
</style>
