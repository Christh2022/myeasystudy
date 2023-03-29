import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebase';

const Chat = () => {
    const [status, setStatus] = useState(0)
    const navigate = useNavigate()
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const userId = user.uid;
                const usersRef = doc(database, "utilisateur", userId);
                getDoc(usersRef).then((doc)=>{
                    if (doc.exists()) {
                        const userStatus = doc.data().status;
                        setStatus(userStatus)
                    } else {
                        console.log("l'utilisateur connecté n'existe pas ");
                        console.log(doc.exists());
                    }
                }).catch((error)=>{
                    console.log(error);
                    console.log("erreur lors de la récupération du status");
                })
            } else {
                navigate('/login')
            }
        })
    })

    return (
        <div >
            {status}
            azertyuiop
        </div>
    );
};

export default Chat;