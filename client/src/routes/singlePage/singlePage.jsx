/* eslint-disable react/no-unescaped-entities */
import './singlePage.scss';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Slider from '../../components/slider/slider';
import Features from '../../components/features/features';
import {  useLoaderData } from 'react-router-dom';
import DOMPurify from "dompurify";
import { useContext, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

const SinglePage = () => {
  const { currentUser } = useContext(AuthContext);
  const post = useLoaderData();
  const [liked, setLiked] = useState(currentUser ? post.likes.includes(currentUser._id) : false);
  const [currentLike, setCurrentLike] = useState(post.likes_count);

  const likeHandler = async () => {
    if (currentUser !== null) {
      if(liked){
        setCurrentLike(prev => prev - 1);
      }else{
        setCurrentLike(prev => prev + 1);
      }
      setLiked(!liked);
      await apiRequest.post(`/listing/${post._id}/like`);
    }
  }

  return (
    <div className='single-page'>
      <div className="main-content">
        <div className="wrapper">
          <Slider images={post.images}></Slider>
          <div className="details">
            <div className="details-top">
              <div className="top-left">
                <h1>{post.title}</h1>
                <p className='location'>
                  <RoomOutlinedIcon className='location-icon'></RoomOutlinedIcon>
                  <span>{post.address}</span>
                </p>
                <p className='price'>
                  <CurrencyRupeeIcon></CurrencyRupeeIcon>
                  <span>{post.price}</span>
                </p>
                <p className='likes' onClick={likeHandler}>
                  {(liked) ? <FavoriteIcon></FavoriteIcon> :
                    <FavoriteBorderIcon></FavoriteBorderIcon>}
                  <span>{currentLike}</span>
                  {/* <span>{post.likes_count}</span> */}
                </p>
              </div>
              <div className="top-right">
                <div className="user-img">
                  <img src={post.userId.avatar || "/noAvatar.jpg"} alt="" />
                </div>
                <span>{post.userId.firstname}</span>
              </div>
            </div>
            <div className="details-bottom">
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}></p>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <Features data={post}></Features>
        </div>
      </div>
    </div>
  )
};

export default SinglePage;
