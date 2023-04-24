import React, { useState } from 'react';
import Chatcomponent from '../component/chat/Chatcomponent';
import SideBar from '../component/sidebarComponent/SideBar';

const Exo = ({name, email}) => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="exo" style={{width: '100%', height: '100vh'}}>
            <div style={showMenu? {filter: ' blur(2px)'} : null}>
                <Chatcomponent/>
            </div>
            <SideBar name={name} email={email} showMenu={showMenu} setShowMenu={setShowMenu}/>
        </div>
    );
};

export default Exo;