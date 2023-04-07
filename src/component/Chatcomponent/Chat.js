import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebase';
import axios from 'axios';

const Chat = ({purchaseToken, setPurchaseToken}) => {
    const [status, setStatus] = useState(0)
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
                        setStatus(userStatus)
                        console.log(doc.data());
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

    const [maVariable, setMaVariable] = useState('');
    useEffect(() => {
     if(status !== 0){
        axios.post('http://localhost:5000/check-payment', {
            purchaseToken: status
          })
        .then(response => {
          setMaVariable(purchaseToken);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
     }
    }, [status, purchaseToken]);

    return (
        <div onClick={()=>signOut(auth)}>
            {status}
            {maVariable}
            azertyuiop
        </div>
    );
};

export default Chat;