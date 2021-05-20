<template>
  <div class="card py-2">
    <h3 class="card-title">{{title}}</h3>
    <p class="card-text">{{description}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.card {
  text-align: center;
  min-height: 30vh;
  box-shadow: 5px 10px 2px 1px rgba(11, 11, 19, 0.2);
}
</style>