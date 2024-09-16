import instance from '../axios/instance';

export const login = async (username: string, password: string) => {
	const response = await instance.post('/auth/login', { username, password });
	localStorage.setItem('token', response.data.access_token);
	return response.data;
};

export const register = async (username: string, password: string) => {
	const response = await instance.post('/auth/register', { username, password });
	// localStorage.setItem('token', response.data.access_token);
	return response.data;
};

export const logout = () => {
	localStorage.removeItem('token');
};
