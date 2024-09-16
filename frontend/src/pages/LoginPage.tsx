import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { login, register } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
	const [isSignUp, setIsSignUp] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
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
					{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
					<form
						onSubmit={handleSubmit}
						className='space-y-4'
					>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='username'
								type='text'
								placeholder='User Name'
								required
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								required
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<Button
							type='submit'
							className='w-full'
						>
							{isSignUp ? 'Sign Up' : 'Sign In'}
						</Button>
					</form>
				</CardContent>
				<CardFooter className='flex flex-col space-y-2'>
					<Button
						variant='link'
						onClick={toggleMode}
					>
						{isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
