import { useContext, useState } from 'react';
import HeroImg from '../../components/heroImg/heroImg';
import './profileUpdate.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import UploadWidget from '../../components/uploadWidget/uploadWidget';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
    const { currentUser, updateUser } = useContext(AuthContext);
    const [avatar, setAvatar] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        setError("");
        const formData = new FormData(event.target);
        const { firstname, lastname, email, phone, password } = Object.fromEntries(formData.entries());

        try {
            const res = await apiRequest.put(`/user/${currentUser._id}`, {
                firstname,
                lastname,
                email,
                phone,
                password,
                avatar: avatar[0],
            });
            updateUser(res.data);
            navigate("/profile");

        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
        }
    }
    return (
        <div className='profile-update'>
            <div className="form-container">
                <div className="profile-widget-box">
                    <h3>Update Profile</h3>
                    <div className="item img-upload">
                        <div className="update-img-container">
                            <img src={avatar[0] || currentUser.avatar || "/noAvatar.jpg"} alt="" />
                        </div>
                        <UploadWidget uwConfig={{
                            cloudName: "dnsqvcm4m",
                            uploadPreset: "rentify",
                            multiple: false,
                            maxImageFileSize: 2000000,
                            folder: "avatars"
                        }} setState={setAvatar}></UploadWidget>
                    </div>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="item">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name="firstname" required defaultValue={currentUser.firstname} />
                    </div>
                    <div className="item">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name="lastname" required defaultValue={currentUser.lastname} />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" required defaultValue={currentUser.email} />
                    </div>
                    <div className="item">
                        <label htmlFor="phone">Contact number</label>
                        <input type="tel" name="phone" pattern='[0-9]{10}' required defaultValue={currentUser.phone} />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                    </div>
                    {error && <span>{error}</span>}
                    <button className='btn'>Update</button>
                </form>
            </div>
            <HeroImg></HeroImg>
        </div>
    )
};

export default ProfileUpdate;
