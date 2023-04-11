import React, { useState } from 'react';
import './chatpage.css'
import Chat from '../component/Chatcomponent/Chat';
import SideBar from '../component/sidebarComponent/SideBar';
import Header from '../component/Header/Header';

const Chatpage = ({name, email, userImage}) => {
    
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className='chat_bot'>
            <div style={showMenu? {filter: ' blur(2px)'} : null}>
                <Header  userImage={userImage} showMenu={showMenu} setShowMenu={setShowMenu}/>
                <Chat  userImage={userImage}/>
            </div>
            <SideBar name={name} email={email} showMenu={showMenu} setShowMenu={setShowMenu}/>
        </div>
    );
};

export default Chatpage;