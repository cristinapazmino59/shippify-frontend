import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/Login';
import s from './Navbar.module.css';

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
            {/* <Login showLogin={showLogin} setShowLogin={setShowLogin}/> */}
            <div className={s.container}>
              <Link to={`/`}>
                <img className={s.logo} src={require(`../../utils/img/logo.jpg`)} alt={'logo'}></img>
              </Link>
              <Link to={`/companies`} className={s.title}>Companies</Link>
              <Link to={`/drivers`} className={s.title}>Drivers</Link>
              <Link to={`/vehicles`} className={s.title}>Vehicles</Link>
            </div>
        </>
    )
}

export default Header;