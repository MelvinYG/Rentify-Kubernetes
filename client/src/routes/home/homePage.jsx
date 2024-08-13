/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import HeroImg from '../../components/heroImg/heroImg';
import Searchbar from '../../components/searchbar/searchbar';
import './homePage.scss';
import { AuthContext } from '../../context/AuthContext';

const HomePage = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className='hero'>
      <div className="text-container">
        <div className="wrapper">
          <h1>
              One-stop solution for all buying and selling rentals
          </h1>
          <h3>The only place where you can trust your buyers and sellers of rentals</h3>
          <Searchbar></Searchbar>
        </div>
      </div>
      <HeroImg></HeroImg>
    </div>
  )
};

export default HomePage;
