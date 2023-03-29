import React, { useState } from 'react';

const Payement = ({handle, amount, payment, title, setPopup, popup}) => {
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
                <li><i className="ion-checkmark"> </i>5GB Linux Web Space</li>
                <li><i className="ion-checkmark"> </i>5 MySQL Databases</li>
                <li><i className="ion-checkmark"> </i>Unlimited Email</li>
                <li><i className="ion-checkmark"> </i>250Gb mo Transfer</li>
                <li><i className="ion-checkmark"> </i>24/7 Tech Support</li>
                <li><i className="ion-checkmark"> </i>Daily Backups</li>
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