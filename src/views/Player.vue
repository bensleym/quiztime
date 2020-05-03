<template>
    <div>
        <div class="player">
            <div class="player__name">
                <h1 v-if="BASE_playerName" class="player__title">
                    {{ BASE_playerName }}
                </h1>
                <TeamInPlay />
            </div>
            <div class="player__top"></div>

            <div
                class="player__bottom"
                :class="BASE_inplay === true ? 'player__bottom--inplay' : ''"
            ></div>

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
        ...mapGetters(['BASE_playerName', 'BASE_inplay'])
    },
    data() {
        return {
            resetActive: false
        };
    },
    created() {
        firestore
            .collection('resetData')
            .doc('reset')
            .onSnapshot(doc => {
                this.resetActive = doc.data().resetActive;
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
        transition: bottom 0.5s linear;

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
</style>
