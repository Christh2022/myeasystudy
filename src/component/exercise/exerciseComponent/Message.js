import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../../../firebase';
import './message.css'

const Message = ({message, image}) => {
    const user = auth.currentUser;
    const ref = useRef();
    const [showDate, setShowDate] = useState(false)
    const handleDate = (a , b)=>{
        if (window.innerWidth > 800) {
            setShowDate(true)
            const milliseconds = a * 1000 + Math.round(b / 1000000);
            const date = new Date(milliseconds);
            const formattedDate = date.toLocaleString('fr-FR'); // formater la date comme une chaîne de caractères
            return formattedDate ;
        }
    }
    

    useEffect(()=>{
        ref.user?.scrollIntoView({behavior: "smooth"});
        window.innerWidth < 800 && setShowDate(false)
    }, [message])

    

    return (
        <div ref={ref} className={`message ${message.senderId === user.uid && 'owner' }`}>
            {message.text && <div className='messageInfo'>
                <img src={message.senderId === user.uid? user.photoURL : image} alt="/" />
                {showDate && <span>{handleDate(message.date.seconds, message.date.nanoseconds)}</span>}
            </div>}
            {message.img && <div className='messageInfo'>
                <img src={message.senderId === user.uid? user.photoURL : image} alt="/" />
                {showDate && <span>{handleDate(message.date.seconds, message.date.nanoseconds)}</span>}
            </div>}
            <div className='messageContent'>
                {message.text && <p>{message.text}</p>}
                {message.img && <a href={message.img}><img src={message.img} alt="/" /></a>}
            </div>
        </div>
    );
};

export default Message;