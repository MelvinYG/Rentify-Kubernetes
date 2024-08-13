/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './features.scss';
import Map from '../map/map';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';

const Features = ({ data }) => {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    function closeHandler() {
        if (currentUser !== null)
            setOpen(!open);
        else
            navigate("/login");
    }

    const handleDeletePost = async () => {
        try{
            await apiRequest.delete(`/listing/${data._id}`);
            navigate("/profile");
        } catch (err) {
            console.log(err);
        }
    }

    const emailHandler = async () => {
        if(currentUser === null) return;
        const emailData = {
            fromEmail: currentUser.email,
            toEmail: data.userId.email,
            listingTitle: data.title
        }
        try{
            const res = await apiRequest.post(`/mail`, emailData);
            console.log(res.data);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='features-container'>
            <div className="room-features">
                <h3>Room sizes</h3>
                <div className="room-content">
                    <span>
                        <AspectRatioIcon></AspectRatioIcon>
                        {data.size / 10} sqm ({data.size} sqf)
                    </span>
                    <span>
                        <KingBedOutlinedIcon></KingBedOutlinedIcon>
                        {data.bedroom} bed
                    </span>
                    <span>
                        <BathtubOutlinedIcon></BathtubOutlinedIcon>
                        {data.bathroom} bathroom
                    </span>
                </div>
            </div>
            <div className="nearby">
                <h3>Nearby Places</h3>
                <div className="nearby-content">
                    <span>
                        <SchoolOutlinedIcon></SchoolOutlinedIcon>
                        {data.school}
                    </span>
                    <span>
                        <DirectionsBusIcon></DirectionsBusIcon>
                        {data.bus}
                    </span>
                    <span>
                        <RestaurantIcon></RestaurantIcon>
                        {data.restaurant}
                    </span>
                </div>
            </div>
            <div className="map-container">
                <h3>Location</h3>
                <Map items={[data]} className="map"></Map>
            </div>
            <div className="contact" onClick={closeHandler}>
                <FavoriteBorderIcon></FavoriteBorderIcon> I'm interested
            </div>
            {(currentUser !==null && currentUser._id === data.userId._id) ?
                <div className="modifications">
                    <Link to={`/${data._id}/update`} className='btn'>Update Post</Link>
                    <button className='btn red' onClick={handleDeletePost}>Delete Post</button>
                </div> : 
                <></>
            }
            {(currentUser && open) ?
                <div className="ownerProfile">
                    <div className="ownerWrapper">
                        <div className="left">
                            <img src={data.userId.avatar || "/noAvatar.jpg"} alt="" />
                        </div>
                        <div className="right">
                            <div className="owner-details">
                                <p>Name: {data.userId.firstname + " " + data.userId.lastname}</p>
                                <p>Email: {data.userId.email}</p>
                                <p>Contact Number: {data.userId.phone}</p>
                            </div>
                            <div className="interest" onClick={emailHandler}>
                                <p>Contact Owner</p>
                            </div>
                        </div>
                        <CloseIcon className='close' onClick={closeHandler}></CloseIcon>
                    </div>
                </div> :
                <></>
            }
        </div>
    )
};

export default Features;

