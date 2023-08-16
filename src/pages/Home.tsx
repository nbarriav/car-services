import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';
import Services from './Services';
const Home = () => {
  const { session, logout } = useContext(AuthContext);

  if (!session) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <header className='bg-sky-900 h-20 flex items-center justify-between pl-4 pr-4 text-white'>
        <h1 className='text-2xl'>CarServices</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <Services />
    </>
  );
};

export default Home;
