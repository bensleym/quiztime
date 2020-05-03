<template>
    <div>
        <div class="player">
            <div class="player__name">
                <h1 v-if="BASE_playerName" class="player__title">{{ BASE_playerName }}</h1>
                <TeamInPlay />
            </div>
            <div class="player__top"></div>

            <div class="player__bottom" :class="activeClass"></div>

            <div class="player__content">
                <PlayerName v-if="!BASE_playerName" />
                <PlayerButton v-else />
            </div>
            <ResetData v-if="resetActive" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import PlayerButton from '../components/PlayerButton.vue';
import PlayerName from '../components/PlayerName.vue';
import ResetData from '../components/ResetData.vue';
import TeamInPlay from '../components/TeamInPlay.vue';
import { firestore } from '../firebase';

export default {
    name: 'PlayerOne',
    components: {
        PlayerButton,
        PlayerName,
        ResetData,
        TeamInPlay
    },
    computed: {
        ...mapGetters(['BASE_playerName', 'BASE_inplay']),

        activeClass() {
            if (this.BASE_inplay && this.isCorrect.length === 0) {
                return 'player__bottom--inplay';
            } else if (this.BASE_inplay && this.isCorrect === 'true')
                return 'player__bottom--inplay correct';
            else if (this.BASE_inplay && this.isCorrect === 'false') {
                return 'player__bottom--inplay incorrect';
            }
        }
    },
    data() {
        return {
            resetActive: false,
            isCorrect: ''
        };
    },
    created() {
        firestore
            .collection('resetData')
            .doc('reset')
            .onSnapshot(doc => {
                this.resetActive = doc.data().resetActive;
            });

        firestore
            .collection('answerBoolean')
            .doc('answer')
            .onSnapshot(doc => {
                this.isCorrect = doc.data().correct;
            });
    }
};
</script>

<style lang="scss" scoped>
@import './../styles/partials/_variables.scss';
@import './../styles/partials/_mixins.scss';

.player {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    &__name {
        position: absolute;
        top: 20px;
        width: 100%;
        z-index: 20;
        text-align: center;
        height: 130px;
    }

    &__top {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -50%;
        background: $purple-heart;
        z-index: 10;
    }

    &__bottom {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: -50%;
        background: $deep-blue;
        z-index: 10;
        transition: all 0.5s linear;

        &--inplay {
            bottom: 0;
        }
    }

    &__content {
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 20;
        text-align: center;

        @include screen(md) {
            width: 50%;
        }
    }

    &__title {
        color: $white;
    }
}

.correct {
    background: $lima;
}

.incorrect {
    background: $monza;
}
</style>
