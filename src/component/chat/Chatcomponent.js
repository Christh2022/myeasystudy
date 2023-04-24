import React, { useState } from 'react';
import ChatSidebar from './chatcomponent/ChatSidebar';
import Chats from './chatcomponent/Chats'
import './chat.css'

const Chatcomponent = () => {
    const [showsidebar, setShowsidebar] = useState(false);

    const handleSidebar = ()=>{
        if (window.innerWidth <= 460) {
            setShowsidebar(!showsidebar);
        }
    }
    return (
        <div className='chat_container'>
            <div className='container'>
                <ChatSidebar handleSidebar={handleSidebar} showsidebar={showsidebar}/>
                <Chats handleSidebar={handleSidebar}/>
            </div>
        </div>
    );
};

export default Chatcomponent;