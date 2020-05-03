<template>
    <div>
        <h1>Player Two</h1>
        <PlayerButton player="playerTwo" />
    </div>
</template>

<script>
import PlayerButton from '../components/PlayerButton.vue';

export default {
    name: 'PlayerTne',
    components: {
        PlayerButton
    }
};
</script>

<style lang="scss" scoped></style>
