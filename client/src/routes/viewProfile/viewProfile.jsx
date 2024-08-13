import { useLoaderData } from 'react-router-dom';
import HeroImg from '../../components/heroImg/heroImg';
import './viewProfile.scss';

const ViewProfile = () => {
    const owner = useLoaderData();
    return (
        <div className='viewprofile'>
            <div className="profile-main">
                <div className="top">
                    <h2>User Information</h2>
                </div>
                <div className="profile-details">
                    <div className="img-container">
                        <img src={owner.avatar[0] || "../noAvatar.jpg"} alt="" />
                    </div>
                    <div className="details">
                        <p>Usename: {owner.firstname + " " + owner.lastname}</p>
                        <p>Email: {owner.email}</p>
                        <p>Contact number: {owner.phone}</p>
                    </div>
                </div>
            </div>
            <HeroImg></HeroImg>
        </div>
    )
};

export default ViewProfile;
