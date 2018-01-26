<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import header from '@/components/header/header'
  import tab from '@/components/tab/tab'

  export default {
    components: {
      'v-header': header,
      'v-tab': tab
    },
    name: 'App'
  }
</script>

<style>

</style>
