import React, { useContext, useEffect, useState } from 'react';
import Message from './Message'
import { ChatContext } from '../ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { database } from '../../../firebase';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const {data} = useContext(ChatContext);

    useEffect(()=>{
        const unSub = onSnapshot(doc(database, "chats", data.chatId), (doc)=>{
            console.log();
            doc.exists() && setMessages(doc.data().messages);
        })

        return ()=>{
            unSub()
        }
    }, [data.chatId])

    console.log(messages.map((m)=>console.log(m)));

    return (
        <div className='messages'>
            {messages.map((m)=>
                <Message message={m} key={m.id}/>
            )}

        </div>
    );
};

export default Messages;