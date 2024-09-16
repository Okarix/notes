export const ErrorMessage = ({ message }: { message: string | null }) => message && <p className='text-red-500 text-sm mb-4'>{message}</p>;
