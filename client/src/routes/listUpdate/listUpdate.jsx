import './listUpdate.scss';
import { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from '../../lib/apiRequest';
import UploadWidget from "../../components/uploadWidget/uploadWidget"
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdatePost = () => {
    const data = useLoaderData();

    const [value, setValue] = useState(data.desc);
    const [images, setImages] = useState(data.images || []);
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
            const res = await apiRequest.put(`/listing/${data._id}`, inputs);
            navigate(`/${data._id}`);
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
                            <input type="text" name="title" required  defaultValue={data.title} />
                        </div>
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill theme='snow' required className='desc' name="desc" value={value} onChange={setValue} defaultValue={data.desc}></ReactQuill>
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input type="text" required name="address" placeholder='Address' defaultValue={data.address} />
                        </div>
                        <div className="item-container">
                            <div className="item">
                                <label htmlFor="city">City</label>
                                <input type="text" required name="city" placeholder='City' defaultValue={data.city} />
                            </div>
                            <div className="item">
                                <label htmlFor="price">Price</label>
                                <input type="number" required min={0} name="price" placeholder='Price' defaultValue={data.price} />
                            </div>
                        </div>
                        <div className="item-container">
                            <div className="item">
                                <label htmlFor="bedroom">Bedroom</label>
                                <input type="number" required min={0} name="bedroom" placeholder='Bedroom' defaultValue={data.bedroom} />
                            </div>
                            <div className="item">
                                <label htmlFor="bathroom">Bathroom</label>
                                <input type="number" required min={0} name="bathroom" placeholder='Bathroom' defaultValue={data.bathroom} />
                            </div>
                            <div className="item">
                                <label htmlFor="size">Size</label>
                                <input type="number" required min={0} name="size" placeholder='Size (in sqft)'defaultValue={data.size}  />
                            </div>
                        </div>
                        <div className="item-container">
                            <div className="item">
                                <label htmlFor="latitude">Latitude</label>
                                <input type="text" required name="latitude" placeholder='Latitude' defaultValue={data.latitude} />
                            </div>
                            <div className="item">
                                <label htmlFor="longitude">Longitude</label>
                                <input type="text" required name="longitude" placeholder='Longitude' defaultValue={data.longitude} />
                            </div>
                        </div>
                        <div className="item">
                            <label htmlFor="school">School</label>
                            <input type="text" required name="school" placeholder='Nearest School' defaultValue={data.school} />
                        </div>
                        <div className="item">
                            <label htmlFor="hospital">Hospital</label>
                            <input type="text" required name="hospital" placeholder='Nearest Hospital' defaultValue={data.hospital}/>
                        </div>
                        <div className="item">
                            <label htmlFor="Restaurant">Restaurant</label>
                            <input type="text" required name="restaurant" placeholder='Nearest Restaurant' defaultValue={data.restaurant} />
                        </div>
                        <div className="item">
                            <label htmlFor="bus">Bus station</label>
                            <input type="text" required name="bus" placeholder='Nearest Bus station' defaultValue={data.bus} />
                        </div>
                        {error && <span>{error}</span>}
                        <button className='btn'>Update Post</button>
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

export default UpdatePost;
