import './message.scss';

const Message = () => {
    return (
        <div className='message-box'>
            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            <span className='name'>Johnny</span>
            <span>Lorem ipsum, dolor sit amet.</span>
        </div>
    )
};

export default Message;
