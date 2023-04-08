import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebase';
const Chat = () => {
    const [status, setStatus] = useState(0)
    const [payment, setPayment] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const userId = user.uid;
                console.log(userId);
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
                    } else {
                        console.log("l'utilisateur connecté n'existe pas ");
                        console.log(doc.exists());
                    }
                    console.log(status);
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
        <div onClick={()=>signOut(auth)} style={{color: 'white'}}>
            {status}
            azertyuiop
            Bonjour
        </div>
    );
};

export default Chat;