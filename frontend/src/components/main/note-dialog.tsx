import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface NoteDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	editMode: boolean;
	note: { title: string; content: string };
	onNoteChange: (field: 'title' | 'content', value: string) => void;
	onSave: () => void;
}

export const NoteDialog: React.FC<NoteDialogProps> = ({ isOpen, onOpenChange, editMode, note, onNoteChange, onSave }) => (
	<Dialog
		open={isOpen}
		onOpenChange={onOpenChange}
	>
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
						value={note.title}
						onChange={e => onNoteChange('title', e.target.value)}
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
						value={note.content}
						onChange={e => onNoteChange('content', e.target.value)}
						className='col-span-3'
					/>
				</div>
			</div>
			<DialogFooter>
				<Button onClick={onSave}>{editMode ? 'Update Note' : 'Create Note'}</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);
