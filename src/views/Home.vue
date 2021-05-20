<template>
  <b-container fluid>
    <div v-if="noticeList.length" class="d-flex flex-wrap pt-1">
      <div v-for="(notice, index) in noticeList" :key="index" class="col-lg-3 col-md-6 col-ls-1 py-4">
        <Notice :title="notice.title" :description="notice.description"></Notice>
      </div>
    </div>
    <div v-else class="d-flex flex-wrap pt-1">
      <div class="col-lg-3 col-md-6 col-ls-1">
        <Notice title="Sem Noticias" description="Não há notícias no momento"></Notice>
      </div>
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
  data(){
    return {
      noticeList: []
    }
  },
  mounted(){
    axios.get('notices').then(
      resp=>{
        this.noticeList = resp.data
      },
      error=>{
        console.log({...error})
      }
    )
  }
}
</script>