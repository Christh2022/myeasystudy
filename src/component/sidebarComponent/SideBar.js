import React from 'react';
import './sidebar.css'
import {BsArrowBarRight, BsFillJournalBookmarkFill} from 'react-icons/bs'
import {AiFillHome, AiFillWechat, AiOutlineUser, AiOutlineLogout} from 'react-icons/ai'
import {HiOutlineClipboardDocumentList} from 'react-icons/hi2'
import {MdSupportAgent} from 'react-icons/md'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';


const SideBar = ({showMenu, setShowMenu, name, email}) => {
    const handleMenu = ()=>{
        if (showMenu) {
            setShowMenu(!showMenu)
        }
    }
    const navigate = useNavigate()
    const handleLogout = ()=>{
        signOut(auth)
        navigate('/login')
    }

    return (
        <div className='sidebar_chat' style={showMenu? {right: '0%'} : null }>
            <div className="slide_bar_firm">
                <span onClick={handleMenu} style={{fontSize: '1.8rem'}}><BsArrowBarRight/></span>
                <span>easystudy</span>
            </div>
            <div className="slide_bar_user_info">
                <span>{name}</span>
                <span>{email}</span>
            </div>
            <div className="slide_bar_menu">
                <ul>
                    <li onClick={()=>navigate('/chat')}>
                        <span><AiFillHome/></span> 
                        <span>Accueil</span>
                    </li>
                    <li onClick={()=>navigate('/profile')}>
                        <span><AiOutlineUser/></span>
                        <span>profil</span>
                    </li>
                    <li onClick={()=>navigate('/exercice')}>
                        <span><BsFillJournalBookmarkFill/></span>
                        <span>exercice (TD)</span>
                    </li>
                    <li onClick={()=>navigate('/exam')}>
                        <span><HiOutlineClipboardDocumentList/></span>
                        <span>Examen</span>
                    </li>
                    <li onClick={()=>navigate('/chat_group')}>
                        <AiFillWechat/>
                        <span>Chat</span>
                    </li>
                    <li onClick={()=>navigate('/support')}>
                        <span><MdSupportAgent/></span>
                        <span>support</span>
                    </li>
                </ul>
            </div>
            <div className="side_bar_logout" onClick={handleLogout}>
                <span><AiOutlineLogout/></span>
                <span>Deconnexion</span>
            </div>
        </div>
    );
};

export default SideBar;