import {  onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, {  useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebase';
import './chatcomponent.css'
import {IoIosSend} from 'react-icons/io'
import {RxCross2} from 'react-icons/rx'
import logo from '../../assets/EASY.png'
const Chat = ({ userImage}) => {
    
    const [status, setStatus] = useState(0);
    const [payment, setPayment] = useState(false);
    const chatLog = useRef();
    const [message, setMessage] = useState("");
    const [tab, setTab] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [upgrade, setUpgrade] = useState(false);
    const navigate = useNavigate();
    const [formule, setFormule] = useState(undefined)
    const [limit, setLimit] = useState(0)

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const userId = user.uid;
                const usersRef = doc(database, "utilisateur", userId);
                getDoc(usersRef).then((doc)=>{
                    if (doc.exists()) {
                        const userStatus = doc.data().status;
                        const userPayment = doc.data().Payement;
                        const question = doc.data().question;
                        const formule = doc.data().formule
                        setFormule(formule)
                        setQuestionNumber(question)
                        setStatus(userStatus)
                        setPayment(userPayment)
                        if (payment === false) {
                            updateDoc(usersRef, {
                                Payement: true,
                            })
                        }
                        if(status === "1" ){
                            navigate('/')
                            console.log('hello');
                        }
                    } else {
                        console.log("l'utilisateur connecté n'existe pas");
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
    
    const handleChat = async (e) => {
        console.log('hello');
        e.preventDefault();
        if(questionNumber < limit){
            const newList = [...tab]; //Copie du tableau tab
            newList.push(message);
            try {
                onAuthStateChanged(auth, (user)=>{
                    if(user){
                        const userId = user.uid;
                        const usersRef = doc(database, "utilisateur", userId);
                        updateDoc(usersRef, {
                            question: questionNumber + 1
                        })
                    }
                })

                const res = await axios.post('https://gpt-myeasystudy.onrender.com/message', {
                        message: message
                    }, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
                const data = await res.json();
                newList.push(data.completion.content);
                console.log(data.completion.content);
            } catch (error) {
            newList.push('une erreur c\'est produite');
            }
            setTab(newList);
            setMessage('');
        }else{
            setUpgrade(true)
            setMessage('');
        }
    };

    const handlePaid = ()=>{
        navigate('/');
        setUpgrade(false);
    }
   
    useEffect(() => {
        if (chatLog.current) {
          const element = chatLog.current;
          element.scrollTop = element.scrollHeight;
        }
    }, [tab]);

    useEffect(()=>{
        if(formule === 'Starter'){
            setLimit(150)
        } else if(formule === 'Basic'){
            setLimit(300)
        } else if(formule === 'VIP'){
            setLimit(750)
        }  else if(formule === 'Prenium'){
            setLimit(1000)
        }
    }, [formule])

    return (
        <>
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
        {upgrade && 
            <div className="chatcomponent_popup">
                <span>Veuillez acheter une formule pour pouvoir continuer</span>
                <span onClick={handlePaid}>Cliquez sur ce bouton</span>
                <span onClick={()=>setUpgrade(false)} style={{position: 'absolute', right: '1rem', top: '0.6rem', fontSize: '1rem'}}>
                    <RxCross2/>
                </span>
            </div>
        }
        </>
    );
};

export default Chat;