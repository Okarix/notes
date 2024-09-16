import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.API_URL || 'http://127.0.0.1:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default instance;
