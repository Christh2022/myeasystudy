import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import './paid.css';
import Payement from './Payement';


function Paid() {
    const [purchaseToken, setPurchaseToken] = useState(null);
    const [amount, setAmount] = useState(15);
    const [testAmount, setTestAmount] = useState(false);
    const [silverAmount, setSilverAmount] = useState(false);
    const [goldAmount, setGoldAmount] = useState(false);
    const [status, setStatus] = useState(0);

  /**
   *  const createPayment = async () => {
    try {
      if(amount !== 0 ){
        if (amount === 100 || amount === 300 || amount === 600) {
          const response = await axios.post("http://localhost:5000/create-payment", {
            amount: amount,
          });
          const { data } = response.data;
          setPurchaseToken(data);
          setStatus(response.status)
          onAuthStateChanged(auth, (user)=>{
            if(user){
              addDoc(collection(database, "utilisateur"), {
                nom : user.displayName,
                email: user.email,
                Tel : user.phoneNumber,
                status : status
              })
            }
          })
        }
      }
    } catch (error) {
        console.error(error);
    }
  }
   */




  const payment = async()=>{
    if(amount !== 0){
      const response = await axios.post("http://localhost:5000/create-payment", {
        amount: amount,
      });
      const { data } = response.data;
      setPurchaseToken(data);
      setStatus(response.status)
      
    }
    onAuthStateChanged(auth, (user)=>{
      if(user){
        addDoc(collection(database, "utilisateur"), {
          nom : user.displayName,
          email: user.email,
          Tel : user.phoneNumber,
          status : status
        })
      } else {
        console.log('aucun utilisateur');
      }
    })
  }

  console.log(purchaseToken, amount, status);

  const handlePayement = ()=>{
    if(status === 200){
      window.location.href = `http://localhost:5000/pay/${purchaseToken}`;
    } else {
      console.log("une erreur c'est produite");
    }
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

  useEffect(()=>{
    const handleAmount = ()=>{
      if(testAmount === true && silverAmount === false && goldAmount === false){
        setAmount(100)
      } else if(testAmount === false && silverAmount === true && goldAmount === false){
        setAmount(300)
      } else if(testAmount === false && silverAmount === false && goldAmount === true){
        setAmount(100)
      } else {
        setAmount(0)
      }
    }

    handleAmount()
  })

  return (
      <div>

          
          <button onClick={payment}>pay</button>
          <p style={{color: 'white'}} onClick={handlePayement}>confirmer le payement</p>
          <p style={{color: 'white'}}>{amount}</p>
          


        <div className="snip1404">
          <Payement payment={payment} handlePayement={handlePayement} handle={handleTest} amount="250"/>
          <Payement payment={payment} handlePayement={handlePayement} handle={handleSilver} amount = "550"/>
          <Payement payment={payment} handlePayement={handlePayement} handle={handleGolden} amount = "1.000"/>
          <Payement payment={payment} handlePayement={handlePayement} amount="1.500"/>
        </div>
      </div>
  );
}


export default Paid;
