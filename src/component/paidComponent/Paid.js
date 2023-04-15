import axios from 'axios';
import { onAuthStateChanged} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebase';
import './paid.css';
import Payement from './Payement';
import Popup from './Popup';

function Paid({purchaseToken, setPurchaseToken}) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(15);
  const [testAmount, setTestAmount] = useState(false);
  const [silverAmount, setSilverAmount] = useState(false);
  const [goldAmount, setGoldAmount] = useState(false);
  const [premiumAmount, setPremiumAmount] = useState(false);
  const [status, setStatus] = useState(0);
  const [phone, setPhone] = useState("");
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState("");
  const [title, seTitle] = useState("");
  const [formule, setFormule] = useState("")
  const [limit, setLimit] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0)
  const navigate = useNavigate();

  const payment = async()=>{
    try {
      if(amount !== 0){
        const response = await axios.post("https://paideasystudy.onrender.com/create-payment", {
          amount: amount,
          name: name,
          title: "Achat d'un abonnement",
          number: phone
        });
        const { data } = response.data;
        setPurchaseToken(data);
        setStatus(response.status)
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePayement = ()=>{
    if(status === 200){
      window.location.href = `https://paideasystudy.onrender.com/pay/${purchaseToken}`;
      onAuthStateChanged(auth, (user)=>{
        if(user){
          updateDoc(doc(database, "utilisateur", user.uid), {
            question: 0
          })
        }
      })
      setOpen(false)
    } else {
      console.log("une erreur c'est produite");
    }
  }

  const handleTest = ()=>{
    setTestAmount(true)
    setSilverAmount(false)
    setGoldAmount(false)
    setPremiumAmount(false)
    seTitle("Starter")
  }

  const handleSilver = ()=>{
    setTestAmount(false)
    setSilverAmount(true)
    setGoldAmount(false)
    setPremiumAmount(false)
    seTitle("Basic")
  }

  const handleGolden = ()=>{
    setTestAmount(false)
    setSilverAmount(false)
    setGoldAmount(true)
    setPremiumAmount(false)
    seTitle("VIP")
  }

  const handlePremium = ()=>{
    setTestAmount(false)
    setSilverAmount(false)
    setGoldAmount(false)
    setPremiumAmount(true)
    seTitle("Premium")
  }

  useEffect(()=>{
    const handleAmount = ()=>{
      if(testAmount === true && silverAmount === false && goldAmount === false && premiumAmount=== false){
        setAmount(300)
      } else if(testAmount === false && silverAmount === true && goldAmount === false && premiumAmount=== false){
        setAmount(600)
      } else if(testAmount === false && silverAmount === false && goldAmount === true && premiumAmount=== false){
        setAmount(1200)
      } else if(testAmount === false && silverAmount === false && goldAmount === false && premiumAmount=== true){
        setAmount(2400)
      } else {
        setAmount(0)
      }
    }
    handleAmount();

    onAuthStateChanged(auth, (user)=>{
      if(user){
        setName(user.displayName)
        const userId = user.uid
        const usersRef = doc(database, "utilisateur", userId);
        getDoc(usersRef).then((doc)=>{
            if (doc.exists()) {
                setQuestionNumber(doc.data().question);
                setPhone(doc.data().tel);
                setFormule(doc.data().formule)
                const userStatus = doc.data().status;
                if(userStatus === "1" && purchaseToken){
                  updateDoc(usersRef, {
                    status: purchaseToken
                  })
                }

                if (questionNumber !== 0 && questionNumber < limit) {
                  navigate('/chat')
                }
            } else {
                console.log("l'utilisateur connecté n'existe pas ");
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

  useEffect(()=>{
    if(formule === 'Starter'){
        setLimit(20)
    } else if(formule === 'Basic'){
        setLimit(40)
    } else if(formule === 'VIP'){
        setLimit(60)
    }  else if(formule === 'Prenium'){
        setLimit(85)
    }

    setTimeout(()=>{
      setOpen(true)
    }, 1000)
  }, [formule])

  return (
    <div className='authentification'>
      {open && 
        <div className='payment-wrapper'>
          <div className={popup?"snip1404 blur" : "snip1404"}>
            <Payement title='starter' popup={popup} setPopup={setPopup} payment={payment} handle={handleTest} amount="300" checkmark1="20 questions"/>
            <Payement title='Basic' popup={popup} setPopup={setPopup} payment={payment} handle={handleSilver} amount = "650" checkmark1="40 questions"/>
            <Payement title='VIP' popup={popup}  setPopup={setPopup} payment={payment} handle={handleGolden} amount = "1.300" checkmark1="65 questions"/>
            <Payement title='Premium' popup={popup} setPopup={setPopup} payment={payment} handle={handlePremium} amount="2.600" checkmark1="100 questions"/>
          </div>
          {popup && <Popup phone={phone} name={name} amount={amount} title={title} handlePayement={handlePayement} setPopup={setPopup}/>}
        </div>
      }

    </div>
  );
}


export default Paid;
