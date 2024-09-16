import instance from '../axios/instance';

export const getNotes = async () => {
	const response = await instance.get('/notes');
	return response.data;
};

export const createNote = async (title: string, content: string) => {
	const response = await instance.post('/notes', { title, content });
	return response.data;
};

export const updateNote = async (id: string, title: string, content: string) => {
	const response = await instance.put(`/notes/${id}`, { title, content });
	return response.data;
};

export const deleteNote = async (id: string) => {
	const response = await instance.delete(`/notes/${id}`);
	return response.data;
};
