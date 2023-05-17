import React, { useEffect, useState } from 'react';
import Chat from '../component/Chatcomponent/Chat';
import SideBar from '../component/sidebarComponent/SideBar';
import Header from '../component/Header/Header';
import { useNavigate } from 'react-router-dom';

const Chatpage = ({user, name, email, userImage}) => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            !user && navigate('/login');  
        }, 500)
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