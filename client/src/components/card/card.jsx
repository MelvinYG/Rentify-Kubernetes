/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './card.scss';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Card = ({item}) => {
    return (
        <div className='card'>
            <Link to={`/${item._id}`} className="card-img">
                <img src={(item.images.length>0) ? item.images[0] : "/noImage.jpg"} alt="" />
            </Link>
            <div className="text-container">
                <h2 className='title'>
                    <Link to={`/${item._id}`}>{item.title}</Link>
                </h2>

                <p className='location'>
                    <RoomOutlinedIcon className='location-icon'></RoomOutlinedIcon>
                    <span>{item.address}</span>
                </p>

                <p className='price'>
                    <CurrencyRupeeIcon></CurrencyRupeeIcon>
                    <span>{item.price}</span>
                </p>
                <div className="features">
                    <span>
                        <KingBedOutlinedIcon></KingBedOutlinedIcon>
                        {item.bedroom} bedroom
                    </span>
                    <span>
                        <BathtubOutlinedIcon></BathtubOutlinedIcon>
                        {item.bathroom} bathroom
                    </span>
                </div>
            </div>
        </div>
    )
};

export default Card;
