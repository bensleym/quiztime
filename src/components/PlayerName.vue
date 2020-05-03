<template>
    <div class="player-name">
        <h1 class="player-name__title">Enter your team name</h1>
        <form class="player-name__form">
            <label>
                <input ref="playerName" type="text" name="teamName" />
            </label>
            <button class="btn btn__primary" @click="teamSubmit($event)">
                Lets go...
            </button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'PlayerName',
    methods: {
        ...mapActions(['BASE_setPlayerName']),

        teamSubmit(event) {
            event.preventDefault();
            this.BASE_setPlayerName(this.$refs.playerName.value);
        }
    }
};
</script>

<style lang="scss" scoped>
@import './../styles/partials/_variables.scss';
@import './../styles/partials/_mixins.scss';

.player-name {
    &__title {
        color: $white;
    }

    &__form {
        @include screen(md) {
            width: 70%;
            margin: auto;
        }
    }
}
</style>
