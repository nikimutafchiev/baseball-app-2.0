import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/Other/NavBar';
import Footer from './components/Other/Footer';
import { useEffect } from 'react';
import { AuthProvider } from './AuthContext';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <AuthProvider>
        <div className='flex flex-col min-h-screen'>
          {location.pathname !== "/login" && location.pathname !== "/signup" && <NavBar />}
          <div className='flex-1 '>
            <Outlet />
          </div>
          {location.pathname !== "/login" && location.pathname !== "/signup" && <Footer />}
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
