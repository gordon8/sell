<template>
  <div class="header">
    <div class="con-wrap">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        
      </div>
    </div>
    <div class="notice-wrap"></div>
  </div>
</template>

<script>
  export default {
      props: {
        seller:{
          type:Object,
        }
      },
      data() {
        return {
        }
      }
    }
</script>

<style scoped>

</style>
