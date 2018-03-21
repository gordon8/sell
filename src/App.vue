<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab></v-tab>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
  import header from '@/components/header/header'
  import tab from '@/components/tab/tab'


  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then(response => {
        response = response.body;
        if (response.errno == 0) {
          this.seller = response.data;
        }
      })
    },
    components: {
      'v-header': header,
      'v-tab': tab
    },

    name: 'App'
  }
</script>

<style>

</style>
