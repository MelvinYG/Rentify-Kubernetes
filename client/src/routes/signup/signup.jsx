import { useState } from 'react';
import HeroImg from '../../components/heroImg/heroImg';
import './signup.scss';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        setError("");
        const formData = new FormData(event.target);
        const {firstname, lastname, email, phone, password } = Object.fromEntries(formData); 
        
        try{
            const res = await apiRequest.post("/auth/signup", {
                firstname, lastname, email, phone, password
            });
            navigate('/login'); 
        }catch (err ){
            setError(err.response.data.message);
        }
    }

    return (
        <div className='signup-page'>
            <div className="form-container">
                <form onSubmit={submitHandler}>
                    <h2>Create an Account</h2>
                    <input type="text" name='firstname' placeholder='First name' required />
                    <input type="text" name='lastname' placeholder='Last name' required />
                    <input type="email" name="email" placeholder='Email' required />
                    <input type="tel" name="phone" pattern='[0-9]{10}' required placeholder='Contact Number' />
                    <input type="password" name='password' placeholder='Password' required />
                    {error && <span>{error}</span>}
                    <button className='btn'>Sign Up</button>
                </form>
            </div>
            <HeroImg></HeroImg>
        </div>
    )
};

export default Signup;
