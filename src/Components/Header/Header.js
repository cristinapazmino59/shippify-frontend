import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/Login';
import s from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loggedUser, toggleAuth } = useContext(AuthContext); 
  const [ showLogin, setShowLogin ] = useState(false);

  const loginUser = () => setShowLogin(true);

  const logoutUser = () => {
    toggleAuth(null);
    localStorage.clear();
    navigate("/");
  };

    return (
        <>
            <Login showLogin={showLogin} setShowLogin={setShowLogin}/>
            <div className={s.container}>
              <img className={s.logo} src={require(`../../utils/img/logo.jpg`)} alt={'logo'}></img>
              <h1>Companies</h1>
              <h1>Drivers</h1>
              <h1>Vehicles</h1>
            </div>
        </>
    )
}

export default Header;