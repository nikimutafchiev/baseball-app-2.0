import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/Other/NavBar';
import Footer from './components/Other/Footer';
import { useEffect } from 'react';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>

      <div className='flex flex-col min-h-screen'>
        {location.pathname !== "/login" && <NavBar />}
        <div className='flex-1 '>
          <Outlet />
        </div>
        {location.pathname !== "/login" && <Footer />}
      </div>
    </>
  );
}

export default App;
