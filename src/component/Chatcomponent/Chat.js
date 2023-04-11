import {  onAuthStateChanged  } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, {  useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebase';
import './chatcomponent.css'
import {IoIosSend} from 'react-icons/io'
import logo from '../../assets/EASY.png'
const Chat = ({ userImage}) => {
    
    const [status, setStatus] = useState(0)
    const [payment, setPayment] = useState(false)
    const chatLog = useRef();
    const [message, setMessage] = useState("")
    const [tab, setTab] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const userId = user.uid;
                const usersRef = doc(database, "utilisateur", userId);
                getDoc(usersRef).then((doc)=>{
                    if (doc.exists()) {
                        const userStatus = doc.data().status;
                        const userPayment = doc.data().Payement
                        setStatus(userStatus)
                        setPayment(userPayment)
                        if (payment === false) {
                            updateDoc(usersRef, {
                                Payement: true,
                            })
                        }
                        // if(userStatus === 0){
                        //     signOut(auth)
                        // }
                    } else {
                        console.log("l'utilisateur connecté n'existe pas ");
                    }
                }).catch((error)=>{
                    console.log(error);
                    console.log("erreur lors de la récupération du status");
                })
            } else {
                // navigate('/login')
            }
        })
    })
    console.log(status, navigate, setStatus, payment, setPayment);
    
    const handleChat = async (e) => {
        e.preventDefault();
        const newList = [...tab]; //Copie du tableau tab
        newList.push(message);
        try {
          const res = await fetch('http://localhost:5080', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: message,
            }),
          });
          const data = await res.json();
          newList.push(data.completion.content);
        } catch (error) {
          newList.push('une erreur c\'est produite');
        }
        setTab(newList);
        setMessage('');
    };
   
    useEffect(() => {
        if (chatLog.current) {
          const element = chatLog.current;
          element.scrollTop = element.scrollHeight;
        }
    }, [tab]);

    return (
        <div className='chatcomponent' style={{color: 'white'}}>
            <div ref={chatLog} className="chat_log">
                <ul>
                    {tab.map((value, index)=>
                        <li key={index}>
                            <div className={index % 2 === 0 ? 'message message_sent' : 'message message_received'}>
                                <span className='profile userImage'>
                                    <img src={index % 2 === 0 ?  userImage : logo} className='user-img' alt={index % 2 === 0 ? 'user' : 'easystudy'}/>
                                </span>
                                <div className='message_text'>{value}</div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            <form onSubmit={handleChat}>
                <div>
                    <input type="text" name="message" value={message} onChange={(e)=>setMessage(e.target.value)} required/>
                    <button type="submit"><IoIosSend/></button>
                </div>
            </form>
        </div>
    );
};

export default Chat;