import instance from '../axios/instance';

export const login = async (email: string, password: string) => {
	const response = await instance.post('/auth/login', { email, password });
	localStorage.setItem('token', response.data.access_token);
	return response.data;
};

export const register = async (email: string, password: string) => {
	const response = await instance.post('/auth/register', { email, password });
	// localStorage.setItem('token', response.data.access_token);
	return response.data;
};

export const logout = () => {
	localStorage.removeItem('token');
};
