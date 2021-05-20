<template>
  <b-container fluid>
    <div class="d-flex justify-content-end py-2">
      <b-button v-b-modal.addNoticeModal @click="reset()">
        <b-icon-plus-circle class="icon"></b-icon-plus-circle>
      </b-button>
      <b-modal 
        id="addNoticeModal" :title="noticeIdToEdit ? 'Atualizar esta postagem' : 'Cadastrar uma postagem'" 
        ref="addNoticeModal" hide-footer
      >        
        <b-form @submit.prevent="noticeIdToEdit ? updateNotice() : createNotice()">
          <b-form-group
            id="input-group-1"
            label="Título"
            label-for="title"
          >
            <b-form-input
              id="title"
              v-model="formCreateNotice.title"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Descrição" label-for="description">
            <b-form-textarea
              id="description"
              v-model="formCreateNotice.description"
              rows="3"
              required
            ></b-form-textarea>
          </b-form-group>
          <b-form-group class="text-center">
            <b-button type="submit" variant="primary">Enviar</b-button>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>
    <div v-if="noticeList.length" class="d-flex flex-wrap pt-1">
      <div v-for="(notice, index) in noticeList" :key="index" class="col-lg-3 col-md-6 col-ls-1 py-4">
        <div>
          <button class="btn btn-warning" v-b-modal.addNoticeModal @click="setValuesToUpdate(notice)">
            <b-icon-pencil class="icon"></b-icon-pencil>
          </button>
          <button class="btn btn-danger" @click="deleteNotice(notice.id)">
            <b-icon-trash class="icon"></b-icon-trash>
          </button>
        </div>
        <Notice :title="notice.title" :description="notice.description"></Notice>
      </div>
    </div>
    <div v-else class="d-flex flex-wrap pt-1">
      <div class="col-lg-3 col-md-6 col-ls-1">
        <Notice title="Sem Noticias" description="Você ainda não postou nada"></Notice>
      </div>
    </div>
  </b-container>
</template>
<script>
import axios from '../services/axios'
import { mapGetters } from 'vuex'
import Notice from '@/components/Notice.vue'
export default {
  name: 'posts',
  components: { Notice },
  data(){
    return {
      noticeIdToEdit: null,
      noticeList: [],
      formCreateNotice: {
        userId: '',
        title: '',
        description: '',
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['userAuthenticated'])
  },
  mounted(){
    const uid = this.userAuthenticated.id
    this.formCreateNotice.userId = uid
    this.getNoticeList(uid)
  },
  methods: {
    getNoticeList(id){
      axios.get(`notices/getByUser/${id}`).then(
        resp=>{
          this.noticeList = resp.data
        },
        error=>{
          console.log({ ...error })
        }
      )
    },
    createNotice(){
      axios.post('notices', this.formCreateNotice).then(
        () => {
          alert('postagem cadastrada com sucesso!')
          this.getNoticeList(this.userAuthenticated.id)
        },
        error => {
          console.log({...error})
        }
      )
    },
    updateNotice(){
      axios.put(`notices/${this.noticeIdToEdit}`, this.formCreateNotice).then(
        () => {
          alert('postagem atualizada com sucesso!')
          this.getNoticeList(this.userAuthenticated.id)
        },
        error => {
          console.log({...error})
        }
      )
    },
    deleteNotice(id){
      axios.delete(`notices/${id}`).then(
        ()=>{
          alert('noticia deletada com sucesso!')
          this.getNoticeList(this.userAuthenticated.id)
        },
        error=>{
          console.log({...error})
        }
      )
    },
    setValuesToUpdate(notice){
      this.reset()
      this.noticeIdToEdit = notice.id
      this.formCreateNotice.title = notice.title
      this.formCreateNotice.description = notice.description
      this.formCreateNotice.userId = notice.userId
    },
    reset(){
      this.noticeIdToEdit = null
      this.formCreateNotice.title = ""
      this.formCreateNotice.description = ""
    }
  }
}
</script>