import React, { useEffect, useState } from 'react';
import Header from '../component/Header/Header';
import SideBar from '../component/sidebarComponent/SideBar';
import ProfileComponent from '../component/profilComponent/ProfileComponent';
import { useNavigate } from 'react-router-dom';

const Profile = ({user, name, email, userImage}) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate= useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            !user && navigate('/login');  
        }, 500);
    })
    return (
        <div className='chat_profiles' style={{width: '100%', height: '100vh'}}>
            <div style={showMenu? {filter: ' blur(2px)'} : null}>
                <Header  userImage={userImage} showMenu={showMenu} setShowMenu={setShowMenu}/>
                <ProfileComponent name={name} email={email}/>
            </div>
            <SideBar name={name} email={email} showMenu={showMenu} setShowMenu={setShowMenu}/>
        </div>
    );
};

export default Profile;