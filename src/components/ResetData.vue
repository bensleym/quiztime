<template>
    <div class="reset-data" :class="resetActive ? 'reset-data--active' : ''">
        <div class="reset-data__settings" @click="activeReset()">
            <settings-icon size="1x" class="reset-data__icon"></settings-icon>
        </div>

        <div class="reset-data__action">
            <button class="btn btn__secondary" @click="clearData()">
                Clear data
            </button>
        </div>
    </div>
</template>

<script>
import { SettingsIcon } from 'vue-feather-icons';

export default {
    name: 'ResetData',
    components: {
        SettingsIcon
    },
    data() {
        return {
            resetActive: false
        };
    },
    methods: {
        activeReset() {
            if (this.resetActive) {
                this.resetActive = false;
            } else {
                this.resetActive = true;
            }
        },
        clearData() {
            localStorage.clear();
            location.reload();
        }
    }
};
</script>

<style lang="scss" scoped>
@import './../styles/partials/_variables.scss';

.reset-data {
    position: absolute;
    bottom: 40px;
    right: -130px;
    display: flex;
    width: 200px;
    background: $thunderbird;
    z-index: 30;
    transition: all 0.25s linear;

    &--active {
        right: 0;
    }

    &__settings {
        width: 70px;
        padding: 15px 0 10px;
    }

    &__icon {
        width: 40px;
        height: 40px;
        color: $white;
        display: block;
        margin: auto;
    }

    &__action {
        padding: 10px 0 10px 10px;
    }
}
</style>
