import React, { useEffect, useState } from 'react';
import './exo.css'
import Users from './exerciseComponent/Users';
import Messages from './exerciseComponent/Messages';
import Input from './exerciseComponent/Input';

const Exercise = ({image, setImage, setShowUser, setShowChatUser, showChatUser, showUser,  otherUser, setOtheruser}) => {
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);

    useEffect(()=>{
        if(window.innerWidth > 800){
            setShowChatUser(false)
        } else {
            setShowChatUser(true)
        }
    })

    return (
        <>
            <div className='exo_component'>
                <div className='container'>
                    <Messages image={image} messages={messages}/>
                    <Input chatid={chatId} otherUser={otherUser}/>
                </div>
            </div>
            {showUser && <Users showUser={showUser} setShowUser={setShowUser} setShowChatUser={setShowChatUser} showChatUser={showChatUser} setOtheruser={setOtheruser} setImage={setImage} setMessages={setMessages} setChatId={setChatId}/>}
        </>
    );
};

export default Exercise;