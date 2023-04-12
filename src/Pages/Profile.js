import React, { useState } from 'react';
import './profile.css'
import Header from '../component/Header/Header';
import SideBar from '../component/sidebarComponent/SideBar';
import ProfileComponent from '../component/profilComponent/ProfileComponent';

const Profile = ({name, email, userImage}) => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className='chat_profiles'>
            <div style={showMenu? {filter: ' blur(2px)'} : null}>
                <Header  userImage={userImage} showMenu={showMenu} setShowMenu={setShowMenu}/>
                <ProfileComponent name={name} email={email}/>
            </div>
            <SideBar name={name} email={email} showMenu={showMenu} setShowMenu={setShowMenu}/>
        </div>
    );
};

export default Profile;