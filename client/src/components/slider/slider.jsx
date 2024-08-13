/* eslint-disable react/prop-types */
import './slider.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
const Slider = ({ images }) => {

    const [imageIndex,setImageIndex] = useState(null);

    function imageHandler(index){
        setImageIndex(index);
    }

    function indexHandler(direction){
        if(direction === "left"){
            if(imageIndex === 0){
                setImageIndex(images.length - 1);
            }else{
                setImageIndex(imageIndex - 1);
            }
        }else{
            if(imageIndex === images.length - 1){
                setImageIndex(0);
            }else{
                setImageIndex(imageIndex + 1);
            }
        }
    }

    function closeHandler(){
        setImageIndex(null);
    }

    return (
        <div className='slider'>
            {imageIndex !== null && <div className="fullscreen-img">
                <KeyboardArrowLeftIcon className='arrow-btn' onClick={() => indexHandler("left")}></KeyboardArrowLeftIcon>
                <div className="full-img">
                    <img src={images[imageIndex]} alt="" />
                </div>
                <KeyboardArrowRightIcon className='arrow-btn' onClick={() => indexHandler("right")}></KeyboardArrowRightIcon>
                <CloseIcon className='close' onClick={closeHandler}></CloseIcon>
            </div>}
            <div className="big-img" onClick={() => imageHandler(0)}>
                <img src={images[0] || "/noImage.jpg"} alt="" />
            </div>
            <div className="small-imgs">
                {images.slice(1).map((image, index) =>
                    <img src={image  || "/noImage.jpg"} alt="" key={index} onClick={() => imageHandler(index)}/>
                )}
            </div>
        </div>
    )
};

export default Slider;
