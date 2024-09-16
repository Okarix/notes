import { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '@/services/notesService';
import { logout } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/main/header';
import { NoteDialog } from '@/components/main/note-dialog';
import { NoteCard } from '@/components/main/note-card';

export interface Note {
	_id: string;
	title: string;
	content: string;
	user: string;
	createdDate: string;
}

export default function MainPage() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [newNote, setNewNote] = useState({ title: '', content: '' });
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<null | string>(null);

	const navigate = useNavigate();

	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () => {
		try {
			const fetchedNotes = await getNotes();
			setNotes(fetchedNotes);
		} catch (error) {
			console.error('Failed to fetch notes:', error);
		}
	};

	const handleCreateNote = async () => {
		if (newNote.title && newNote.content) {
			try {
				if (editMode && noteToEdit !== null) {
					await updateNote(noteToEdit, newNote.title, newNote.content);
				} else {
					await createNote(newNote.title, newNote.content);
				}
				fetchNotes();
				setNewNote({ title: '', content: '' });
				setIsDialogOpen(false);
			} catch (error) {
				console.error('Failed to create/update note:', error);
			}
		}
	};

	const handleEditNote = (id: string) => {
		const note = notes.find(note => note._id === id);
		if (note) {
			setNewNote({ title: note.title, content: note.content });
			setNoteToEdit(id);
			setEditMode(true);
			setIsDialogOpen(true);
		}
	};

	const handleDeleteNote = async (id: string) => {
		try {
			await deleteNote(id);
			fetchNotes();
		} catch (error) {
			console.error('Failed to delete note:', error);
		}
	};

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	const handleNoteChange = (field: 'title' | 'content', value: string) => {
		setNewNote(prevNote => ({ ...prevNote, [field]: value }));
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<Header
				onNewNote={() => setIsDialogOpen(true)}
				onLogout={handleLogout}
			/>
			<main className='flex-1 p-6 bg-background'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{notes.map(note => (
						<NoteCard
							key={note._id}
							note={note}
							onEdit={handleEditNote}
							onDelete={handleDeleteNote}
						/>
					))}
				</div>
			</main>
			<NoteDialog
				isOpen={isDialogOpen}
				onOpenChange={open => {
					setIsDialogOpen(open);
					if (!open) {
						setNewNote({ title: '', content: '' });
						setEditMode(false);
						setNoteToEdit(null);
					}
				}}
				editMode={editMode}
				note={newNote}
				onNoteChange={handleNoteChange}
				onSave={handleCreateNote}
			/>
		</div>
	);
}
