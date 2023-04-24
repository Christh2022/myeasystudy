import React, { useContext, useState } from 'react';
import {FiMoreHorizontal} from 'react-icons/fi';
import {BsFillCameraVideoFill} from 'react-icons/bs'
import {AiOutlineUserAdd, AiFillHome} from 'react-icons/ai'
import {BiArrowBack} from 'react-icons/bi'
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../ChatContext';

const Chats = ({handleSidebar}) => {
    const {data} = useContext(ChatContext);
    const [menu_toggle, setMenu_toggle] = useState(false);
    const handleToggle = ()=>{
        if (window.innerWidth <= 460) {
            setMenu_toggle(!menu_toggle);
        }
    }
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.nom}</span>
                <div className='chatIcons'>
                    <span><BsFillCameraVideoFill/></span>
                    <span><AiOutlineUserAdd/></span>
                    <span onClick={handleToggle}><FiMoreHorizontal/></span>
                    {menu_toggle && <div class="menu_toggle">
                        <span><AiFillHome/> Accueil </span>
                        <span onClick={handleSidebar} title='sortir de la conversation'><BiArrowBack/> Retour</span>
                    </div>}
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    );
};

export default Chats;