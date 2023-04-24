import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { auth, database } from '../../../firebase';
import { ChatContext } from '../ChatContext';

const Users = ({handleSidebar}) => {
    const [chats, setChats] = useState([])
    const user = auth.currentUser
    const {dispatch} = useContext(ChatContext)
    useEffect(()=>{
        const getChats = ()=> {
            const unSub = onSnapshot(doc(database, "conversation", user.uid), (doc)=>{
                setChats(doc.data());
            })

            return ()=>{
                unSub();
            }
        }

        user.uid && getChats();
    }, [user.uid])

    console.log(chats);

    const handleSelect = (u)=>{
        dispatch({type: "CHANGE_USER", payload: u})
        if(window.innerWidth <= 460){
            handleSidebar();
        }
    }
    return (
        <div className='chats'>
           {Object.entries(chats)?.sort((a,b)=>a[1].date - b[1].date).map((chat)=> 
            <div className='userChat' key={chat.id} onClick={()=>handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="/" />
                <div className='userChatInfo'>
                    <span>{chat[1].userInfo.nom}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
           )}
        </div>
    );
};

export default Users;