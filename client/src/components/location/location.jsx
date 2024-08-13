/* eslint-disable react/prop-types */
import { Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './location.scss'

const Location = ({item}) => {
    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div className="popup-container">
                    <div className="pop-img">
                        <img src={item.img} alt="" />
                    </div>
                    <div className="text-container">
                        <Link to={`./${item.id}`}>
                            <h3>{item.title}</h3>
                        </Link>
                        <span><b>{item.bedroom} bedroom</b></span>
                        <span>
                            <CurrencyRupeeIcon></CurrencyRupeeIcon>
                            <b>{item.price}</b>
                        </span>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
};

export default Location;
