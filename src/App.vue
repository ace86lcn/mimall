<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import storage from './storage'
export default {
  name: 'App',
  mounted () {
    this.getUser()
    this.getCarCount()
  },
  methods: {
    getUser () {
      this.axios.get('/user').then(() => {

      })
    },
    getCarCount () {
      this.axios.get('/carts/products/sum').then(() => {

      })
    }
  }
}
</script>
<style lang="scss">
@import '/assets/scss/reset.scss';
@import '/assets/scss/btn.scss';
</style>
