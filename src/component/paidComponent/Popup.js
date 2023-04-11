import React, { useEffect } from 'react';
import './popup.css'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, database } from '../../firebase';

const Popup = ({name, phone, amount, title, setPopup, handlePayement}) => {
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const userId = user.uid
                const usersRef = doc(database, "utilisateur", userId)
                updateDoc(usersRef, {
                    formule: title,
                    prix: `${amount} FCFA`,
                    
                })
            }
        })
    })

    return (
        <div className='payement-popup'>
            <h3>Nom : {name}</h3>
            <div>
                <span>Motant : {amount}FCFA</span>
                <span>Formule : {title}</span>
                <span>Numero : {phone}</span>
            </div>
            <div>
                <button onClick={handlePayement}>Payé</button>
                <button onClick={()=>setPopup(false)}>Annuler</button>
            </div>
        </div>
    );
};

export default Popup;