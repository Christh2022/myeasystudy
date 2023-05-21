import React, { useState } from 'react';
import Chat from '../component/Chatcomponent/Chat';
import SideBar from '../component/sidebarComponent/SideBar';
import Header from '../component/Header/Header';

const Chatpage = ({ name, email, userImage}) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='chat_bot' style={{width: '100%', height: '100vh'}}>
            <div style={showMenu? {filter: ' blur(2px)'} : null}>
                <Header  userImage={userImage} showMenu={showMenu} setShowMenu={setShowMenu}/>
                <Chat  userImage={userImage}/>
            </div>
            <SideBar name={name} email={email} showMenu={showMenu} setShowMenu={setShowMenu}/>
        </div>
    );
};

export default Chatpage;