import { Button } from '@/components/ui/button';
import { FormField } from './form-field';

interface AuthFormProps {
	isSignUp: boolean;
	onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	username: string;
	setUsername: (value: string) => void;
	password: string;
	setPassword: (value: string) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isSignUp, onSubmit, username, setUsername, password, setPassword }) => (
	<form
		onSubmit={onSubmit}
		className='space-y-4'
	>
		<FormField
			id='username'
			label='Email'
			type='text'
			placeholder='User Name'
			required
			value={username}
			onChange={e => setUsername(e.target.value)}
		/>
		<FormField
			id='password'
			label='Password'
			type='password'
			required
			value={password}
			onChange={e => setPassword(e.target.value)}
		/>
		<Button
			type='submit'
			className='w-full'
		>
			{isSignUp ? 'Sign Up' : 'Sign In'}
		</Button>
	</form>
);
