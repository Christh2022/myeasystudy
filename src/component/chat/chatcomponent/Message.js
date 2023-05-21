import React, { useContext, useEffect, useRef } from 'react';
import { auth } from '../../../firebase';
import { ChatContext } from '../ChatContext';

const Message = ({message}) => {
    const user = auth.currentUser;
    const {data} = useContext(ChatContext);

    console.log(message);
    const ref = useRef();

    const checkMessage = (mess)=>{
        if(!mess) console.log('sac');
    }

    useEffect(()=>{
        ref.user?.scrollIntoView({behavior: "smooth"})
    }, [message])
    return (
        <div className={`message ${message.senderId === user.uid && 'owner' }`}>
            <div className='messageInfo'>
                <img src={message.senderId === user.uid? user.photoURL : data.user.photoURL} alt="/" />
                <span>just now</span>
            </div>
            <div className='messageContent'>
                {checkMessage(message.text) && <p>{message.text}</p>}
                {message.img && <a href={message.img}><img src={message.img} alt="/" /></a>}
            </div>
        </div>
    );
};

export default Message;