import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/layout/LayoutDefault.vue'),
		children: [
			{
				path: '',
				component: () => import('../views/Home.vue'),
			},
			{
				path: 'postagens',
				component: () => import('../views/Posts.vue'),
			},
			{
				path: 'perfil',
				component: () => import('../views/Profile.vue'),
			}
		]
	},
]

const router = new VueRouter({
  mode: 'history',
	routes,
})

export default router
