//import { signOut } from 'firebase/auth';
import axios from 'axios';
import React, { useState } from 'react';
//import { auth } from '../../firebase';

function Paid({setToken}) {
    const [purchaseToken, setPurchaseToken] = useState(null);
    const [status, setStatus] = useState(0);

    const createPayment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create-payment');
            const { data } = response.data;
            setPurchaseToken(data);
            setToken(data)
            console.log(response.status);
        } catch (error) {
            console.error(error);
        }
    }

    const redirectToPayment = () => {
        window.location.href = `http://localhost:5000/pay/${purchaseToken}`;
    }

    return (
        <div>
            <button onClick={createPayment}>Créer un paiement</button>
            {purchaseToken && <button onClick={redirectToPayment}>Payer</button>}
        </div>
    );
}


export default Paid;
