import React, { useState } from 'react';
import {HiBars3} from 'react-icons/hi2'
import {CiSearch} from 'react-icons/ci'
import {BsChatLeft} from 'react-icons/bs'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {AiOutlineAppstore} from 'react-icons/ai'
import {HiOutlinePlus} from 'react-icons/hi2'
import './header.css';

const Header = ({showChatUser, setShowChatUser, showUser,setShowUser, showMenu, userFind, setUserFind, handleSearch, setShowMenu, userImage, searchUser, setSearchUser}) => {
    const [showResearch, setShowResearch] = useState(false);

    const research = ()=>{
        setShowResearch(!showResearch)
        if(userFind){
            setUserFind(false);
            setSearchUser("")
        }
    }

    const sideBarShow = ()=>{
        setShowMenu(!showMenu)
    }

    const handleChange = (value)=>{
        setSearchUser(value);
        handleSearch()
        value.length > 0 ? setUserFind(true) : setUserFind(false)
    } 
    const handleUser = ()=>{
        if(window.innerWidth <= 800){
            setShowUser(!showUser)
            setShowChatUser(!showChatUser)
        }
    }

    return (
        <header>
            <div className='topbar'>
                <nav className='navbar navbar-expand'>
                    <div className= {showResearch? 'mobile-toggle-menu hide' : 'mobile-toggle-menu'}>
                        <span onClick={sideBarShow}  className='icon-menu'>
                           <HiBars3/>
                        </span>
                    </div>
                    <div className= {showResearch? 'search-bar flex-grow-1 hide' : 'search-bar flex-grow-1'}>
                        <div className={showResearch? 'container-search' : 'container-search'}>
                            <input placeholder='...Recherche' value={searchUser} className='form-control search-control' onChange={(e)=>handleChange(e.target.value)}/>
                            <span  className={showResearch? 'search-show' : 'search-show hide'} style={{cursor: 'pointer'}}>
                                <CiSearch/>
                            </span>
                        </div>
                        <span className={showResearch? 'close hide' : 'close'} style={{cursor: 'pointer'}} onClick={research} >
                            <HiOutlinePlus/>
                        </span>
                        
                    </div>
                    <div className={showResearch? 'top-menu hide': 'top-menu ms-auto'}>
                        <ul className='navbar-nav'>
                                <li className='mobile-search-icon'>
                                    <span onClick={research}  className='nav-link' style={{cursor: 'pointer'}}>
                                        <CiSearch/>
                                    </span>
                                </li>
                                <li className='nav-item dropdown dropdown-large' onClick={handleUser}>
                                    <span className='nav-link' style={{cursor: 'pointer'}}>
                                        <AiOutlineAppstore/>
                                    </span>
                                </li>
                                <li className='nav-item dropdown dropdown-large'>
                                    <span className='nav-link'  style={{cursor: 'pointer'}}>
                                        <IoMdNotificationsOutline/>
                                    </span>  
                                </li>
                                <li className='nav-item dropdown dropdown-large'>
                                    <span className='nav-link' style={{fontSize: '1rem', cursor: 'pointer'}}>
                                        {<BsChatLeft/>}
                                    </span>
                                </li>
                        </ul>
                    </div>
                    <div className={showResearch? 'user-box hide' :'user-box dropdown'}>
                        <span className='profile'>
                            <img src={userImage} className='user-img' alt='/'/>
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;