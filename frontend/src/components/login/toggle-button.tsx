import { Button } from '../ui/button';

interface ToggleModeButtonProps {
	isSignUp: boolean;
	onClick: () => void;
}

export const ToggleModeButton: React.FC<ToggleModeButtonProps> = ({ isSignUp, onClick }) => (
	<Button
		variant='link'
		onClick={onClick}
	>
		{isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
	</Button>
);
