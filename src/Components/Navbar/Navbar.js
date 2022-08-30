import { Link } from 'react-router-dom';
import s from './Navbar.module.css';

const Header = () => {
    return (
        <>
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