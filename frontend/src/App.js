import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <div className='flex-1 '>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
