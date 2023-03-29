import React from 'react';
import './popup.css'

const Popup = ({name, phone, amount, title, setPopup, handlePayement}) => {
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