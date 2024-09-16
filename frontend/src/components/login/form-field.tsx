import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
	id: string;
	label: string;
	type: string;
	value: string;
	placeholder?: string;
	required?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ id, label, type, value, onChange, ...props }) => (
	<div className='space-y-2'>
		<Label htmlFor={id}>{label}</Label>
		<Input
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			{...props}
		/>
	</div>
);
