import { useState, useEffect } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getNotes, createNote, updateNote, deleteNote } from '@/services/notesService';
import { logout } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

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
			console.log(fetchedNotes);
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
		console.log(id);
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

	return (
		<div className='flex flex-col min-h-screen'>
			<header className='flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground'>
				<h1 className='text-2xl font-bold'>My Notes</h1>
				<div className='flex items-center space-x-4'>
					<Dialog
						open={isDialogOpen}
						onOpenChange={open => {
							setIsDialogOpen(open);
							if (!open) {
								setNewNote({ title: '', content: '' });
								setEditMode(false);
								setNoteToEdit(null);
							}
						}}
					>
						<DialogTrigger asChild>
							<Button variant='secondary'>
								<Plus className='mr-2 h-4 w-4' /> New Note
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{editMode ? 'Edit Note' : 'Create a New Note'}</DialogTitle>
								<DialogDescription>{editMode ? 'Update your note details' : 'Add a title and content for your new note.'}</DialogDescription>
							</DialogHeader>
							<div className='grid gap-4 py-4'>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label
										htmlFor='title'
										className='text-right'
									>
										Title
									</Label>
									<Input
										id='title'
										value={newNote.title}
										onChange={e => setNewNote({ ...newNote, title: e.target.value })}
										className='col-span-3'
									/>
								</div>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label
										htmlFor='content'
										className='text-right'
									>
										Content
									</Label>
									<Textarea
										id='content'
										value={newNote.content}
										onChange={e => setNewNote({ ...newNote, content: e.target.value })}
										className='col-span-3'
									/>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={handleCreateNote}>{editMode ? 'Update Note' : 'Create Note'}</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<Button
						variant='outline'
						onClick={handleLogout}
					>
						<LogOut className='mr-2 h-4 w-4' /> Log Out
					</Button>
				</div>
			</header>
			<main className='flex-1 p-6 bg-background'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{notes.map(note => (
						<Card key={note._id}>
							<CardHeader>
								<CardTitle>{note.title}</CardTitle>
								<CardDescription>{note.createdDate.slice(0, 10)}</CardDescription>
							</CardHeader>
							<CardContent>
								<p>{note.content}</p>
							</CardContent>
							<CardFooter className='flex justify-between'>
								<Button
									variant='outline'
									onClick={() => handleEditNote(note._id)}
								>
									Edit
								</Button>
								<Button
									variant='destructive'
									onClick={() => handleDeleteNote(note._id)}
								>
									Delete
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</main>
		</div>
	);
}
