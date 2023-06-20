import React from 'react'
import { HashRouter} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home';
import Profile from './Profile';
import Followers from './Followers';
import Following from './Following';
import Search from './Search';
import AllUsers from './AllUsers';
// import Header from './Header';
// import { AuthContext } from '../context/AuthContext';
// const ProtectedRoute=({path,element})=>{
//   const user=JSON.parse(localStorage.getItem('user'));
//   const navigate=useNavigate();
//   if(!user)
//   {
//     return <Navigate to='/login'/>
//   }
//   return <Routes><Route path={path} element={element}/></Routes>
// };
const App = () => {
  // const { user } = useContext(AuthContext);
  const user=JSON.parse(localStorage.getItem('user'));
  return (
    <HashRouter>
      <Routes>


        <Route path='/'>
          <Route index element={<Home/>} />
          <Route path="/allusers" element={<AllUsers/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path='/followers' element={<Followers/>}/>
          <Route path='/following' element={<Following/>}  />
          <Route path='/search' element={<Search/>}  />

        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App