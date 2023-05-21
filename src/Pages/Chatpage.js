import React, { useEffect, useState } from 'react';
import Chat from '../component/Chatcomponent/Chat';
import SideBar from '../component/sidebarComponent/SideBar';
import Header from '../component/Header/Header';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Chatpage = ({ name, email, userImage}) => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const user = auth.currentUser;
    useEffect(()=>{
        if(user) console.log('hello');
    })
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