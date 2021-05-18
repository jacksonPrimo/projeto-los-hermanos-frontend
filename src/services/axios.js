import axios from 'axios';
const baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000'
const api = axios.create({
	baseURL
});

api.interceptors.request.use(
  config => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	err => Promise.reject(err)
);

api.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

export default api;
