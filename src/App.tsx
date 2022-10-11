import { Link } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

// TODO: uspolis page
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Link to='/classrooms'>Salas</Link>
      </header>
    </div>
  );
}

export default App;
