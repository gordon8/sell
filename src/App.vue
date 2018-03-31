<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab></v-tab>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import {urlParse} from "./common/js/utils";
  import header from '@/components/header/header'
  import tab from '@/components/tab/tab'


  export default {
    data() {
      return {
        seller: {
          id: urlParse().id
        }
      }
    },
    created() {
      this.$http.get('/api/seller' + '?id=' + this.seller.id).then(response => {
        response = response.body;
        if (response.errno == 0) {
          this.seller = Object.assign({}, this.seller, response.data);
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
