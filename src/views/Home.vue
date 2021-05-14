<template>
  <b-container fluid class="d-flex flex-wrap pt-1">
    <div class="col-3">
      <Notice title="teste" description="apenas um teste"></Notice>
    </div>
  </b-container>
</template>


<script>
import axios from '@/services/axios.js'
import Notice from '@/components/Notice.vue'
export default {
  name: 'Home',
  components: {
    Notice
  },
  mounted(){
    axios.get('notices').then(
      resp=>{
        console.log(resp)
      },
      error=>{
        console.log({...error})
      }
    )
  }
}
</script>