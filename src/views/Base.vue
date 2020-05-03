<template>
    <div class="base">
        <!-- <Navigation /> -->
        <router-view />
        <!-- <Footer /> -->
    </div>
</template>

<script>
// import Navigation from '../components/Navigation.vue';
// import Footer from '../components/Footer.vue';

export default {
    name: 'Base',
    metaInfo: {
        base: { target: '_blank', href: '/' },
        title: 'Quiz Time',
        meta: [
            {
                charset: 'uft-8'
            },
            {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0'
            }
        ],
        link: [
            {
                rel: 'favicon'
            }
        ]
    },
    components: {}
};
</script>

<style lang="scss">
@import './src/styles/base.scss';
</style>
