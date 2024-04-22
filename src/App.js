import './App.css';

import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AcademyDetail from './components/AcademyDetail';
import ManagerBooks from './components/ManagerBooks';
import ManagerStaffs from './components/ManagerStaffs';
import PrivateRoute from './components/PrivateRoute';
import { ApiContextProvider } from './contexts/ApiContext';
import Academies from './pages/Academies';
import ChooseProfile from './pages/ChooseProfile';
import CourtDetail from './pages/Client/CourtDetail';
import Courts from './pages/Client/Courts';
import UserProfile from './pages/Client/UserProfile';
import CourtBook from './pages/CourtBook';
import Home from './pages/Home';
import Login from './pages/Login';
import Manager from './pages/Manager';
import ManagerAcadamies from './pages/ManagerAcadamies';
import ManagerCourts from './pages/ManagerCourts';
import ManagerSettings from './pages/ManagerSettings';
import Redirect from './pages/Redirect';
import SignUp from './pages/SignUp';

function App() {

  const apiContext = useContext(ApiContextProvider)

  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const res = await apiContext?.getUser()

      if (res?.data?.id) {

        const res_profile = await apiContext?.checkProfile(localStorage.getItem('token'))
        if (res_profile?.data?.manager) {
          navigate('/manager/' + res_profile?.data?.manager?.user_details?.username)
        }
        else {
          if (res_profile?.data?.staff) {
            navigate('/staff/' + res_profile?.data?.staff?.user_details?.username)
          } else {
            if (res_profile?.data?.user) {
              navigate('/profile/' + res_profile?.data?.user?.user_details?.username)
            }
          }
        }

      } else {
        navigate('/auth/login')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
      }

    } catch (err) {
      navigate('/check/profile')
      console.log(err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser()
    } else {
      navigate('/auth/login')
    }
  }, [])


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/redirect' element={<Redirect />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/check/profile' element={<ChooseProfile />} />


        <Route path='/manager/:username' element={<PrivateRoute><Manager /></PrivateRoute>} />
        <Route path='/manager/:username/academies' element={<PrivateRoute><ManagerAcadamies /></PrivateRoute>} />
        <Route path='/manager/:username/courts' element={<PrivateRoute><ManagerCourts /></PrivateRoute>} />
        <Route path='/manager/:username/books' element={<PrivateRoute><ManagerBooks /></PrivateRoute>} />
        <Route path='/manager/:username/staffs' element={<PrivateRoute><ManagerStaffs /></PrivateRoute>} />
        <Route path='/manager/:username/settings' element={<PrivateRoute><ManagerSettings /></PrivateRoute>} />


        <Route path='/staff/:username' element={<PrivateRoute><Manager /></PrivateRoute>} />
        <Route path='/staff/:username/academies' element={<PrivateRoute><ManagerAcadamies /></PrivateRoute>} />
        <Route path='/staff/:username/courts' element={<PrivateRoute><ManagerCourts /></PrivateRoute>} />
        <Route path='/staff/:username/books' element={<PrivateRoute><ManagerBooks /></PrivateRoute>} />
        <Route path='/staff/:username/settings' element={<PrivateRoute><ManagerSettings /></PrivateRoute>} />


        <Route path='/profile/:username/' element={<PrivateRoute><UserProfile /></PrivateRoute>} />

        <Route path='/academies/' element={<PrivateRoute><Academies /></PrivateRoute>} />
        <Route path='/academies/:academyName/' element={<PrivateRoute><AcademyDetail /></PrivateRoute>} />

        <Route path='/courts' element={<PrivateRoute><Courts /></PrivateRoute>} />
        <Route path='/court/:courtName/:courtId' element={<PrivateRoute><CourtDetail /></PrivateRoute>} />
        <Route path='/court/:courtName/:courtId/book/' element={<PrivateRoute><CourtBook /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
