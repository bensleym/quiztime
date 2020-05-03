<template>
    <div class="player-button">
        <button
            @click="btnSubmit($event)"
            class="btn btn__primary player-button__btn"
            :disabled="isActive !== true"
            :class="
                isActive !== true
                    ? 'btn--disabled'
                    : '' || BASE_inplay === true
                    ? 'btn--inplay'
                    : ''
            "
        >
            <span v-if="isActive && BASE_playerName === activePlayer"
                >In Play!</span
            >
            <span v-else-if="isActive && BASE_playerName !== activePlayer"
                >Answer Now</span
            >
            <span v-else>Locked out</span>
        </button>
    </div>
</template>

<script>
import setFirestore, { getFirestore } from '../utils/firestore';
import { firestore } from '../firebase';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'PlayerButton',
    computed: {
        ...mapGetters(['BASE_playerName', 'BASE_inplay'])
    },
    created() {
        firestore
            .collection('active')
            .doc('activePlayer')
            .onSnapshot(doc => {
                this.activePlayer = doc.data().player;
                console.log('Current data: ', doc.data());
                this.checkActive();
                this.checkInPlay();
            });
        this.getActivePlayer();
    },
    data() {
        return {
            buttonPressed: 'false',
            activePlayer: '',
            isActive: true
        };
    },
    methods: {
        ...mapActions(['BASE_setInplay']),

        btnSubmit(event) {
            const doc = 'activePlayer';
            event.preventDefault();
            setFirestore({ player: this.BASE_playerName }, 'active', doc);
            this.buttonPressed = true;
        },
        async getActivePlayer() {
            const doc = 'activePlayer';
            this.activePlayer = await getFirestore('active', doc).then(data => {
                return data.player;
            });
        },
        checkActive() {
            if (this.activePlayer) {
                if (this.activePlayer !== this.BASE_playerName) {
                    this.isActive = false;
                }
            } else {
                this.isActive = true;
            }
        },
        checkInPlay() {
            if (this.activePlayer) {
                if (this.activePlayer === this.BASE_playerName) {
                    this.BASE_setInplay(true);
                }
            } else {
                this.BASE_setInplay(false);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import './../styles/partials/_variables.scss';

.player-button {
    &__btn {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 28px;
    }
}

.btn {
    transition: all 0.5s linear;

    &--inplay {
        background: $vivid-tangerine;
    }
}
</style>
