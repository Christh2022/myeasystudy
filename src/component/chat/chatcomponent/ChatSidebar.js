import React from 'react';
import Navbar from './Navbar'
import Search from './Search'
import Users from './Users';

const ChatSidebar = ({showsidebar, handleSidebar}) => {
    return (
        <div className={`sidebar ${showsidebar && 'hide' }`}>
            <Navbar/>
            <Search handleSidebar={handleSidebar} />
            <Users handleSidebar={handleSidebar}/>
        </div>
    );
};

export default ChatSidebar; 