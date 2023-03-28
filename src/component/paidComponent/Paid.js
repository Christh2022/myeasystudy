//import { signOut } from 'firebase/auth';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
//import { auth } from '../../firebase';

function Paid({setToken}) {
    const [purchaseToken, setPurchaseToken] = useState(null);
    const [amount, setAmount] = useState(15);
    const [testAmount, setTestAmount] = useState(false);
    const [silverAmount, setSilverAmount] = useState(false);
    const [goldAmount, setGoldAmount] = useState(false);
    //const [status, setStatus] = useState(0);


    useEffect(() => {
      const handleAmount = ()=>{
        if(testAmount && !silverAmount && !goldAmount){
          setAmount(100)
        } else if(!testAmount && silverAmount && !goldAmount){
          setAmount(300)
        } else if(!testAmount && !silverAmount && goldAmount){
          setAmount(600)
        }
        
      }
      handleAmount()
      
    });
    const createPayment = async () => {
        try {
            const response = await axios.post("http://localhost:5000/create-payment", {
                amount: amount,
            });
            const { data } = response.data;
            setPurchaseToken(data);
            console.log(response.status);
        } catch (error) {
            console.error(error);
        }
    }

    const redirectToPayment = () => {
        setToken(purchaseToken)
        window.location.href = `http://localhost:5000/pay/${purchaseToken}`;
    }

    const handleTest = ()=>{
      setTestAmount(true)
      setSilverAmount(false)
      setGoldAmount(false)
    }

    const handleSilver = ()=>{
      setTestAmount(false)
      setSilverAmount(true)
      setGoldAmount(false)
    }

    const handleGolden = ()=>{
      setTestAmount(false)
      setSilverAmount(false)
      setGoldAmount(true)
    }


    return (
        <div>
            <button onClick={handleTest}>
              <span onClick={createPayment}>100</span>
            </button>
            <button onClick={handleSilver}>
              <span onClick={createPayment}>300</span>
            </button>
            <button onClick={handleGolden}>
              <span onClick={createPayment}>600</span>
            </button>

            <p style={{color: 'white'}}>{purchaseToken }</p>
            <p style={{color: 'white'}}>{amount}</p>
            {purchaseToken && <button onClick={redirectToPayment}>Payer</button>}
            

        </div>
    );
}


export default Paid;
