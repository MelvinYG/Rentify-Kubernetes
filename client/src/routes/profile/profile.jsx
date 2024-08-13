import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import './profile.scss';
import Card from '../../components/card/card';
import HeroImg from '../../components/heroImg/heroImg.jsx';
import apiRequest from '../../lib/apiRequest.js';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

const Profile = () => {
  const post = useLoaderData();
  const navigate = useNavigate();

  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='profile-page'>
      <div className="profile-main">
        <div className="top">
          <h2>User Information</h2>
          <Link to={"/profile-update"} className='btn'>Edit</Link>
        </div>
        <div className="profile-details">
          <div className="img-container">
            <img src={currentUser.avatar || "../noAvatar.jpg"} alt="" />
          </div>
          <div className="details">
            <p>Usename: {currentUser.firstname + " " + currentUser.lastname}</p>
            <p>Email: {currentUser.email}</p>
            <p>Contact number: {currentUser.phone}</p>
            <button onClick={handleLogout} className='btn'>Logout</button>
          </div>
        </div>
        <div className="my-list">
          <div className="top">
            <h2>My List</h2>
            <Link to={"/list/add"} className='btn'>Add New Post</Link>
          </div>
          <div className="card-container">
            {post.map((item, index) =>
              <Card key={index} item={item}></Card>
            )}
          </div>
        </div>
      </div>
      <HeroImg></HeroImg>
      {/*<div className="message-container">
         <div className="top">
          <h2>Messages</h2>
        </div>
        <div className="message-details">
          <Message></Message>
          <Message></Message>
          <Message></Message>
          <Message></Message>
      </div>
        </div> */}
    </div>
  )
};

export default Profile;
