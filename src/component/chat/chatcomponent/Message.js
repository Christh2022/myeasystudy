import React, { useState , useContext, useEffect, useRef } from 'react';
import { auth } from '../../../firebase';
import { ChatContext } from '../ChatContext';

const Message = ({message}) => {
    const user = auth.currentUser;
    const {data} = useContext(ChatContext);

    console.log(message);
    const ref = useRef();
    const handleselect = ()=>{
        console.log('hello');
    }

    useEffect(()=>{
        ref.user?.scrollIntoView({behavior: "smooth"})
    }, [message])
    return (
        <div className={`message ${message.senderId === user.uid && 'owner' }`}>
            <div className='messageInfo'>
                <img src={message.senderId === user.uid? user.photoURL : data.user.photoURL} alt="/" onClick={handleselect} />
                <span>just now</span>
            </div>
            <div className='messageContent'>
                {message.text !== '' ? <p>{message.text}</p> : console.log('hello')}
                {message.img && <a href={message.img}><img src={message.img} alt="/" /></a>}
            </div>
        </div>
    );
};

export default Message;