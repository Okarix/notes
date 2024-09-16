import { useState } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Placeholder data for existing notes
const initialNotes = [
	{ id: 1, title: 'Meeting Notes', content: 'Discuss project timeline and deliverables.', date: '2023-05-15' },
	{ id: 2, title: 'Ideas for New Feature', content: 'Brainstorming session outcomes.', date: '2023-05-14' },
	{ id: 3, title: 'Book Recommendations', content: 'List of books to read this summer.', date: '2023-05-13' },
];

export default function MainPage() {
	const [notes, setNotes] = useState(initialNotes);
	const [newNote, setNewNote] = useState({ title: '', content: '' });
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleCreateNote = () => {
		if (newNote.title && newNote.content) {
			const date = new Date().toISOString().split('T')[0];
			setNotes([...notes, { id: notes.length + 1, ...newNote, date }]);
			setNewNote({ title: '', content: '' });
			setIsDialogOpen(false);
		}
	};

	const handleLogout = () => {
		// Placeholder for logout functionality
		console.log('Logging out...');
		// Implement actual logout logic here, e.g., clearing session, redirecting to login page, etc.
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<header className='flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground'>
				<h1 className='text-2xl font-bold'>My Notes</h1>
				<div className='flex items-center space-x-4'>
					<Dialog
						open={isDialogOpen}
						onOpenChange={setIsDialogOpen}
					>
						<DialogTrigger asChild>
							<Button variant='secondary'>
								<Plus className='mr-2 h-4 w-4' /> New Note
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create a New Note</DialogTitle>
								<DialogDescription>Add a title and content for your new note.</DialogDescription>
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
								<Button onClick={handleCreateNote}>Create Note</Button>
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
						<Card key={note.id}>
							<CardHeader>
								<CardTitle>{note.title}</CardTitle>
								<CardDescription>{note.date}</CardDescription>
							</CardHeader>
							<CardContent>
								<p>{note.content}</p>
							</CardContent>
							<CardFooter>
								<Button variant='outline'>Edit</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</main>
		</div>
	);
}
