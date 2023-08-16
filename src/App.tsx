import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './auth/AuthContext';
import SessionForm from './components/SessionForm';

function App() {
  const router = createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <SessionForm action='Log in' /> },
        { path: '/signup', element: <SessionForm action='Sign up' /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
