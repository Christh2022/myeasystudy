import React, { useState } from 'react';

const Payement = ({handle, amount, payment, title, setPopup, popup, checkmark1}) => {
    const [confirm, setconfirm] = useState(false)

    return (
        <div className="plan">
            <header>
                <h4 className="plan-title">
                  {title}
                </h4>
                <div className="plan-cost">
                    <span className="plan-price">{amount}FCFA</span>
                    <span className="plan-type">/mois</span>
                </div>
            </header>
            <ul className="plan-features">
                <li><i className="ion-checkmark"> </i>{checkmark1}</li>
                <li><i className="ion-checkmark"> </i>N'importe quel sujet</li>
                <li><i className="ion-checkmark"> </i>Pour les Collégiens</li>
                <li><i className="ion-checkmark"> </i>Pour les Lycéens</li>
                <li><i className="ion-checkmark"> </i>Pour les Etudians & Professeur</li>
                <li><i className="ion-checkmark"> </i>Disponible 24h/24</li>
            </ul>
            <div className="plan-select">
                {!confirm ?<span onClick={()=>{
                    setconfirm(!confirm)
                    handle()
                    payment()
                }}>payer</span>
                :
                <span onClick={()=>{
                    setconfirm(!confirm)
                    setPopup(!popup)
                    payment()
                }}>valider</span>}
            </div>
        </div>

    );
};

export default Payement;