import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

// TODO: uspolis page
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Link to='classrooms'>Salas</Link>
      </header>
    </div>
  );
}

export default App;
