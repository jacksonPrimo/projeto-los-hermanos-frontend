<template>
  <div>
    <b-navbar toggleable="lg" class="header">
      <b-navbar-brand class="brand">Mural Online</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav class="ml-auto">
        <b-navbar-nav class="ml-auto">
          <b-nav-item >
            <b-icon-arrow-clockwise class="icon"></b-icon-arrow-clockwise>
            Atualizar
          </b-nav-item>
          <b-nav-item to="Postagem">
            <b-icon-plus class="icon"></b-icon-plus>
              Criar
          </b-nav-item>
          <b-nav-item >
            <b-icon-share class="icon"></b-icon-share>
              Compartilhar
          </b-nav-item>
          <template v-if="user">
            <b-avatar></b-avatar>
            <b-nav-item-dropdown right >
                <template #button-content>
                  <em>{{ user.name }}</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-nav-item v-b-modal.login>
              Fazer Login
            </b-nav-item>
            <b-modal id="login" :title="signupInModal? 'Cadastro': 'login'" ref="loginModal" hide-footer>
              <b-form v-if="!signupInModal" @submit.prevent="login()">
                <b-form-group
                  id="input-group-1"
                  label="Email address:"
                  label-for="email"
                >
                  <b-form-input
                    id="email"
                    v-model="formSignin.email"
                    type="email"
                    placeholder="Enter email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Your Name:" label-for="password">
                  <b-form-input
                    id="password"
                    v-model="formSignin.password"
                    placeholder="Enter name"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="text-center">
                  <b-button type="submit" variant="primary">Submit</b-button>
                </b-form-group>
                <div class="text-center">
                  <b-link @click="signupInModal = !signupInModal">ainda não é um usuário? clique aqui para se cadastrar</b-link>
                </div>
              </b-form>
              <b-form v-if="signupInModal">
                <b-form-group
                  label="Primeiro Nome"
                  label-for="firstName"
                >
                  <b-form-input
                    id="firstName"
                    v-model="formSignup.lastName"
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
                    v-model="formSignup.lastName"
                    type="text"
                    placeholder="Ultimo Nome"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Email address:"
                  label-for="email"
                >
                  <b-form-input
                    id="email"
                    v-model="formSignup.email"
                    type="email"
                    placeholder="Enter email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Data de Nasciento" label-for="birthDate">
                  <b-form-input
                    id="birthDate"
                    type="date"
                    v-model="formSignup.birthDate"
                    placeholder="Data de Nascimento"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Telefone" label-for="phone">
                  <b-form-input
                    id="phone"
                    v-model="formSignup.phone"
                    placeholder="Telefone"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Your Name:" label-for="password">
                  <b-form-input
                    id="password"
                    v-model="formSignup.password"
                    placeholder="Enter name"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="text-center">
                  <b-button type="submit" variant="primary">Submit</b-button>
                </b-form-group>
                <div class="text-center">
                  <b-link @click="signupInModal = !signupInModal">
                    {{
                      signupInModal
                      ? 'ainda não é um usuário? clique aqui para se cadastrar'
                      : 'ja é um usuário? clique aqui para fazer login'
                    }}
                  </b-link>
                </div>
              </b-form>
            </b-modal>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'LayoutDefalt',
  data(){
    return {
      signupInModal: false,
      user: '',
      formSignin: {
        email: '',
        password: ''
      },
      formSignup: {
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        phone: '',
        password: '',
        type: 'user'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['signIn', 'signUp']),
    closeModal(){
      this.$refs.loginModal.hide()
    },
    login(){
      this.signIn(this.formSignin).then(
        resp=>{
          console.log(resp)
          alert('usuário logado')
        },
        error=>{
          alert('ocorreu um erro')
          console.error(error)
        }
      )
    }
  }
}
</script>
<style scoped>
body {
  width: 100%;
}
.header {
  background-color: #004910;
  min-width: 100%;
}

.brand {
  color: #eeeeee;
}

.navbar-light .navbar-nav .nav-link{
  color: #eeeeee;
}

.btn .b-icon.bi, .nav-link .b-icon.bi, .dropdown-toggle .b-icon.bi, .dropdown-item .b-icon.bi, .input-group-text .b-icon.bi{
  color: #eeeeee;
}
</style>