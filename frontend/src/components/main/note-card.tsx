import { Note } from '@/pages/MainPage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NoteCardProps {
	note: Note;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => (
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
				onClick={() => onEdit(note._id)}
			>
				Edit
			</Button>
			<Button
				variant='destructive'
				onClick={() => onDelete(note._id)}
			>
				Delete
			</Button>
		</CardFooter>
	</Card>
);
