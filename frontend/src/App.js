import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import Overview from './components/Overview';
import DescriptionSection from './components/DescriptionSection';

function App() {
  return (
    <div >
      <NavBar />
      <HeroSection />
      <Overview />
      <DescriptionSection />
    </div>
  );
}

export default App;
