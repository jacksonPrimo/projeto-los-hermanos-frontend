<template>
  <div>
    <b-container fluid class="pr-0 pl-0">
      <Header></Header>
    </b-container>
  </div>
</template>


<script>
import Header from '@/components/Header.vue'
export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>