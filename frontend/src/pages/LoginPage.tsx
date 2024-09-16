import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { login, register } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@/components/login/error-message';
import { AuthForm } from '@/components/login/auth-form';
import { ToggleModeButton } from '@/components/login/toggle-button';

export default function LoginPage() {
	const [isSignUp, setIsSignUp] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		try {
			if (isSignUp) {
				await register(username, password);
			} else {
				await login(username, password);
			}
			navigate('/main');
		} catch (err) {
			setError('Authentication failed. Please check your credentials.');
			console.error('Authentication error:', err);
		}
	};

	const toggleMode = () => setIsSignUp(!isSignUp);

	return (
		<main className='container py-10 mx-auto'>
			<Card className='w-full max-w-md mx-auto'>
				<CardHeader>
					<CardTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</CardTitle>
					<CardDescription>{isSignUp ? 'Create an account to start taking notes' : 'Sign in to access your notes'}</CardDescription>
				</CardHeader>
				<CardContent>
					<ErrorMessage message={error} />
					<AuthForm
						isSignUp={isSignUp}
						onSubmit={handleSubmit}
						username={username}
						setUsername={setUsername}
						password={password}
						setPassword={setPassword}
					/>
				</CardContent>
				<CardFooter className='flex flex-col space-y-2'>
					<ToggleModeButton
						isSignUp={isSignUp}
						onClick={toggleMode}
					/>
				</CardFooter>
			</Card>
		</main>
	);
}
