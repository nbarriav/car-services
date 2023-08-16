import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
interface SessionFormProps {
  action: 'Log in' | 'Sign up';
}
const SessionForm = ({ action }: SessionFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { session, login, signup } = useContext(AuthContext);
  let formFooter;
  if (session) {
    return <Navigate to={'/'} />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (action === 'Log in') {
      const possibleError = await login(email, password);
      if (possibleError) {
        setError(possibleError);
      }
    } else {
      const possibleError = await signup(email, password);
      if (possibleError) {
        setError(possibleError);
      }
    }
  };

  if (action === 'Log in') {
    formFooter = (
      <div className='flex flex-col gap-3'>
        <span>Don't have an account?</span>
        <Link to='/signup' className='text-blue-500 hover:underline'>
          Sign up
        </Link>
      </div>
    );
  } else {
    formFooter = (
      <div className='flex flex-col gap-3'>
        <span>Already have an account?</span>
        <Link to='/login' className='text-blue-500 hover:underline'>
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-sky-800'>
      <h1 className='text-3xl text-white mb-3'>Welcome to CarServices!</h1>
      <form
        className='flex flex-col bg-slate-300 p-10 rounded-xl w-96'
        onSubmit={handleSubmit}
      >
        {error && <span className='text-red-500'>{error}</span>}
        <label htmlFor='email'>Email</label>
        <input
          className='rounded-xl p-2 mb-2 border-2 border-gray-300'
          type='email'
          placeholder='Your email'
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          id='email'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className='rounded-xl p-2 mb-2 border-2 border-gray-300'
          id='password'
        />
        <div className='flex flex-col gap-3'>
          <button className='bg-blue-500 text-white rounded-xl p-2 hover:bg-blue-700'>
            <span>{action}</span>
          </button>
          {formFooter}
        </div>
      </form>
    </div>
  );
};

export default SessionForm;
