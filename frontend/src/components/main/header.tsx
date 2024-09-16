import { Button } from '../ui/button';
import { Plus, LogOut } from 'lucide-react';

interface HeaderProps {
	onNewNote: () => void;
	onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewNote, onLogout }) => (
	<header className='flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground'>
		<h1 className='text-2xl font-bold'>My Notes</h1>
		<div className='flex items-center space-x-4'>
			<Button
				variant='secondary'
				onClick={onNewNote}
			>
				<Plus className='mr-2 h-4 w-4' /> New Note
			</Button>
			<Button
				variant='outline'
				onClick={onLogout}
			>
				<LogOut className='mr-2 h-4 w-4' /> Log Out
			</Button>
		</div>
	</header>
);
