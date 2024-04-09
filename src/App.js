import './App.css';

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Redirect from './pages/Redirect';
import Manager from './pages/Manager';
import PrivateRoute from './components/PrivateRoute';
import ManagerCourts from './pages/ManagerCourts';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/redirect' element={<Redirect />} />

        <Route path='/manager/:username' element={<PrivateRoute><Manager /></PrivateRoute>} />
        <Route path='/manager/:username/courts' element={<PrivateRoute><ManagerCourts /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
