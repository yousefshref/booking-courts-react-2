import './App.css';

import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
