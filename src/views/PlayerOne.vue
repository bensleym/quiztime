<template>
    <div>
        <h1>Player One</h1>
        <PlayerButton player="playerOne" />
    </div>
    <!-- Migrate to a single player with dynamic team name -->
</template>

<script>
import PlayerButton from '../components/PlayerButton.vue';

export default {
    name: 'PlayerOne',
    components: {
        PlayerButton
    }
};
</script>

<style lang="scss" scoped></style>
