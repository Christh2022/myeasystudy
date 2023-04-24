import React from 'react';
import { auth } from '../../../firebase';
import {IoIosArrowRoundBack} from 'react-icons/io'

const Navbar = () => {
    const user = auth.currentUser
    return (
        <div className='navbar'>
            <span className='logo'>studychat</span>
            <div className='user'>
                <img src={user.photoURL} alt="/" />
                <span>{user.displayName}</span>
            </div>
            <div className="go_back_dashbord">
                <span><IoIosArrowRoundBack/></span>
            </div>
        </div>
    );
};

export default Navbar;