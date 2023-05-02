import React, { useEffect, useState } from 'react';
import { auth, database } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import './users.css'

const Users = ({showUser, setShowUser, setShowChatUser, showChatUser, setMessages, setChatId, setImage, setOtheruser}) => {
    const user = auth.currentUser;
    const [chats, setChats] = useState([]);
    
    useEffect(()=>{
        if(user){
            onSnapshot(doc(database, "conversation", user.uid), (doc)=>{
                let newChats = Object.entries(doc.data()).sort((a,b)=>b[1].date - a[1].date);
                setChats(newChats);
            })
        }
    });

    const handleSelect = (e)=>{
        const chatId = 
            user.uid > e.uid 
                ? user.uid + e.uid
                : e.uid + user.uid;
        setChatId(chatId);
        setOtheruser(e.uid)
        onSnapshot(doc(database, "chats", chatId), (doc)=>{
            setMessages(doc.data().messages);
        });
        setShowChatUser(!showChatUser);
        setShowUser(!showUser)
    };


    return (
        <div className={`user_exo ${showChatUser && 'show'}`}>
            <div className="userChat">
                {chats.map((chat)=>(
                    <div key={chat.id} className="user__chat" onClick={()=> {setImage(chat[1].userInfo.photoURL); handleSelect(chat[1].userInfo)}}>
                        <img src={chat[1].userInfo.photoURL} alt="/" />
                        <div className='userChatInfo'>
                            <span>{chat[1].userInfo.nom}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;