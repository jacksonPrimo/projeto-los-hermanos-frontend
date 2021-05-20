import axios from '../../services/axios'
export default {
  namespaced: true,
  state: () => ({ 
    token: localStorage.token,
    user: localStorage.user
  }),
  getters: {
    authenticated: state => !!state.token,
    // eslint-disable-next-line no-extra-boolean-cast
    userAuthenticated: state => (!!state.user) ? JSON.parse(state.user) : {},
  },
  actions: {
    async signIn({ commit }, userSignin){
      try {
        const res = await axios.post('auth/signin', userSignin)
        const { user, token } = res.data
        commit('setUser', JSON.stringify(user))
        commit('setToken', token)
        commit('signIn', res.data)
      }
      catch(err){
        console.error(err)
        throw err
      }
    },
    // eslint-disable-next-line no-unused-vars
    async signUp({ commit }, user){
      try {
        await axios.post('auth/signup', user)
      }
      catch(err){
        console.error(err)
        throw err
      }
    },
    async signOut({commit}){
      commit('setToken', '')
      commit('setUser', '')
      commit('signOut')
    }
  },
  mutations: {
    signIn(state, data) {
			const { token, user } = data
			localStorage.setItem('user', JSON.stringify(user))
			localStorage.setItem('token', token)
		},
		signOut() {
			localStorage.setItem('token', '')
			localStorage.setItem('user', '')
		},
		setToken(state, token) {
			state.token = token
		},
		setUser(state, user) {
			state.user = user
		},
	},

}