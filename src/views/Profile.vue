<template>
  <div class="container">
    <b-form @submit.prevent="update()">
      <b-form-group
        label="Primeiro Nome"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="updateForm.firstName"
          type="text"
          placeholder="Primeiro Nome"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Ultimo Nome"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="updateForm.lastName"
          type="text"
          placeholder="Ultimo Nome"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="updateForm.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Data de Nasciento" label-for="birthDate">
        <b-form-input
          id="birthDate"
          type="date"
          v-model="updateForm.birthDate"
          placeholder="Data de Nascimento"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Telefone" label-for="phone">
        <b-form-input
          id="phone"
          v-model="updateForm.phone"
          placeholder="Telefone"
        ></b-form-input>
      </b-form-group>
      <b-form-group class="text-center">
        <b-button type="submit" variant="primary">Atualizar</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
import axios from '../services/axios'
import { mapGetters } from 'vuex'
export default {
  name: 'profile',
  data(){
    return {
      updateForm: {
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        phone: '',
        password: '',
        type: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['userAuthenticated'])
  },
  mounted(){
    const uid = this.userAuthenticated.id
    axios.get(`users/${uid}`).then(resp=>{
      this.updateForm = resp.data
      this.updateForm.birthDate = resp.data.birthDate.split('/').reverse().join('-')
    })
  },
  methods: {
    update(){
      const uid = this.userAuthenticated.id
      axios.put(`users/${uid}`, this.updateForm).then(
        () => {
          alert('perfil atualizado')
        },
        error=>{
          console.log({...error})
          const code = error.response.status
          if(code === 409 )
            alert('usuario não encontrado')
          if(code === 400 )
            alert('Dados Invalidos')
          if(code === 500 )
            alert('Erro no servidor')
        }
      )
    }
  }
}
</script>