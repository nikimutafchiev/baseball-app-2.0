import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useEffect } from 'react';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>

      <div className='flex flex-col min-h-screen'>
        <NavBar />
        <div className='flex-1 '>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
