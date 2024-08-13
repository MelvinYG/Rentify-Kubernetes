import { useState } from 'react';
import './createPost.scss';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from '../../lib/apiRequest';
import UploadWidget from "../../components/uploadWidget/uploadWidget"
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [value, setValue] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        setError("");
        const formData = new FormData(event.target);
        const inputs = Object.fromEntries(formData);
        inputs.desc = value;
        inputs.images = images;

        try {
            const res = await apiRequest.post("/listing", inputs);
            navigate("/" + res.data._id)
        } catch (err) {
            console.log(err);
            setError(error.response.message.data);
        }

    }

    return (
        <div className='create-post'>
            <div className="form-container">
                <h3>Add new Post</h3>
                <div className="wrapper">
                    <form onSubmit={submitHandler}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" required placeholder='Title' />
                        </div>
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill theme='snow' required className='desc' name="desc" value={value} onChange={setValue}></ReactQuill>
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input type="text" required name="address" placeholder='Address' />
                        </div>
                        <div className="item-container">
                            <div className="item">
                                <label htmlFor="city">City</label>
                                <input type="text" required name="city" placeholder='City/Location' />
                            </div>
                            <div className="item">
                                <label htmlFor="price">Price</label>
                                <input type="number" required min={0} name="price" placeholder='Price' />
                            </div>
                        </div>
                        <div className="item-container">
                            <div className="item">
                                <label htmlFor="bedroom">Bedroom</label>
                                <input type="number" required min={0} name="bedroom" placeholder='Bedroom' />
                            </div>
                            <div className="item">
                                <label htmlFor="bathroom">Bathroom</label>
                                <input type="number" required min={0} name="bathroom" placeholder='Bathroom' />
                            </div>
                            <div className="item">
                                <label htmlFor="size">Size</label>
                                <input type="number" required min={0} name="size" placeholder='Size (in sqft)' />
                            </div>
                        </div>
                        <div className="item-container">
                            <div className="item">
                                <label htmlFor="latitude">Latitude</label>
                                <input type="text" required name="latitude" placeholder='Latitude' />
                            </div>
                            <div className="item">
                                <label htmlFor="longitude">Longitude</label>
                                <input type="text" required name="longitude" placeholder='Longitude' />
                            </div>
                        </div>
                        <div className="item">
                            <label htmlFor="school">School</label>
                            <input type="text" required name="school" placeholder='Nearest School' />
                        </div>
                        <div className="item">
                            <label htmlFor="hospital">Hospital</label>
                            <input type="text" required name="hospital" placeholder='Nearest Hospital' />
                        </div>
                        <div className="item">
                            <label htmlFor="Restaurant">Restaurant</label>
                            <input type="text" required name="restaurant" placeholder='Nearest Restaurant' />
                        </div>
                        <div className="item">
                            <label htmlFor="bus">Bus station</label>
                            <input type="text" required name="bus" placeholder='Nearest Bus station' />
                        </div>
                        {error && <span>{error}</span>}
                        <button className='btn'>Add Post</button>
                    </form>
                </div>
            </div>
            <div className="side-container">
                <UploadWidget uwConfig={{
                    cloudName: "dnsqvcm4m",
                    uploadPreset: "rentify",
                    maxImageFileSize: 2000000,
                    folder: "listing"
                }} setState={setImages}></UploadWidget>
            </div>
        </div>
    )
};

export default CreatePost;
