<template>
  <div class="card">
    <h2>{{title}}</h2>
    <p>{{description}}</p>
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