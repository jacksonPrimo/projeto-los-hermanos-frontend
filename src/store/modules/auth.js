import axios from '../../services/axios'
import { parseJwt } from '../../utils/converters'
export default {
  namespaced: true,
  state: () => ({ 
    token: localStorage.token,
    user: localStorage.user
  }),
  getters: {
    authenticated: state => !!state.token,
    userAuthenticated: state => (state.user ? JSON.parse(state.user) : {}),
  },
  actions: {
    async signIn({ commit }, user){
      try {
        const res = await axios.post('auth/signin', user)
        commit('signIn', res.data)
        commit('setToken', res.data.token)
        commit('setUser', JSON.stringify(parseJwt(res.data.token)))
      }
      catch(err){
        console.error(err)
        throw err
      }
    },
    async signUp(user){
      try {
        await axios.post('auth/signup', user)
      }
      catch(err){
        console.error(err)
        throw err
      }
    },
    async signOut({commit}){
      try {
        await axios.post('auth/signout')
        commit('signOut')
        commit('setToken', '')
      }
      catch(err){
      if (err.response.status === 403) {
        commit('signOut')
        commit('setToken', '')
        return
      }
      console.error(err)
      throw err
      }
    }
  },
  mutations: {
		signIn(state, user) {
      console.log('user', user)
			const { token } = user
			const jwtUser = parseJwt(token)
			localStorage.setItem('user', JSON.stringify(jwtUser))
			localStorage.setItem('token', token)
		},
		signOut() {
			localStorage.removeItem('token')
			localStorage.removeItem('user')
		},
		setToken(state, token) {
			state.token = token
		},
		setUser(state, user) {
			state.user = user
		},
	},

}