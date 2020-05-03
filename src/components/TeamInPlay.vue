<template>
    <div class="team-in-play" :class="activeTeam.length > 0 ? 'team-in-play--inplay': ''">
        <div v-if="BASE_playerName !== activeTeam && activeTeam.length > 0" class="team-in-play__content">
            <p class="team-in-play__team">Team in play: <span>{{ activeTeam }}</span></p>
        </div>
    <div>
</template>

<script>
import { firestore } from '../firebase';
import { mapGetters } from 'vuex';

export default {
    name: 'TeamInPlay',
    created() {
        firestore
            .collection('active')
            .doc('activePlayer')
            .onSnapshot(doc => {
                this.activeTeam = doc.data().player;
            });
    },
    computed: {
        ...mapGetters(['BASE_playerName'])
    },
    data() {
        return {
            activeTeam: ''
        }
    }
}
</script>
<style lang="scss" scoped>
@import './../styles/partials/_variables.scss';

.team-in-play {
    width: 300px;
    margin: auto;
    margin-top: 20px;
    text-align: left;
    position: absolute;
    right: -300px;
    bottom: 0;
    z-index: 30;
    transition: all 0.5s linear;

    &--inplay {
        right: 0;
    }

    &__content {
        background: $vivid-tangerine;
        padding: 10px 0 10px 20px;
        border-radius: 5px;
    }

    &__team {
        span {
            font-weight: 700;
        }
    }
}
</style>