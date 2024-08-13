import './navbar.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const {currentUser} = useContext(AuthContext);

  function menuHandler() {
    setMenuOpen(prev => !prev);
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <a href='/' className="logo">
          <img src="../logo.png" alt="" />
          <span>Rentify</span>
        </a>
        <a href="/">Home</a>
        <a href="/list">All Listings</a>
        <a href="/list/add">Sell</a>
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <div className='profile-container'>
            <div className="user-info">
              <img src={currentUser.avatar || "../noAvatar.jpg"} alt="" />
              <span>{currentUser.firstname + " " + currentUser.lastname}</span>
            </div>
            <Link to="/profile" className='btn'>Profile</Link>
          </div>) :
          (<>
            <a href="/login">Log In</a>
            <a href="/signup" className='btn'>Sign Up</a>
          </>
          )}
        <MenuIcon className='menu-btn pointer' onClick={menuHandler}></MenuIcon>
        <div className={menuOpen ? "menu active" : "menu"}>
          <div className="close-btn">
            <CloseIcon className='pointer' onClick={menuHandler}></CloseIcon>
          </div>
          <a href="/">Home</a>
          <a href="/list">All Listings</a>
          <a href="/list/add">Sell</a>
          {currentUser ?
            <>
              <a href='/profile'>Profile</a>
            </> :
            <>
              <a href="/Login">Log In</a>
              <a href="/signup">Sign Up</a>
            </>
          }
        </div>
      </div>
    </div >
  )
};

export default Navbar;