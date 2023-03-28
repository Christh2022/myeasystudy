import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';

const Paid = () => {
    const [clickTest ,setClickTest] = useState(false)
    const [clickSilver ,setClickSilver] = useState(false)
    const [clickGold ,setClickGold] = useState(false)
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)


    const paid = async()=>{
        if (clickTest && !clickSilver && !clickGold) {
            setAmount(300);
        } else if(!clickTest && clickSilver && !clickGold) {
            setAmount(600);
        } else if(!clickTest && !clickSilver && clickGold) {
            setAmount(1200);
        }
        const product = {
            label: "Achat d'un Iphone S",
            amount: amount,
            details: "Iphone S, 32 GB, Gris...",
          };
          const customer = {
            uuid: UUID(),
            name: name,
            phone: phone
          };
          const url = "https://ekolopay.com/api/v1/gateway/purchase-token?api_client=easystudy";
          
          try {
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customer: JSON.stringify(customer),
                product: JSON.stringify(product),
                amount: amount,
                secret_key: "a96d3a19-6e5c-46a6-9af2-fe99815b92a5"
              })
            });
            
            if (response.status === 200) {
              const responseData = await response.json();
              return responseData.response;
            }
          } catch (error) {
            console.log(error);
          }
          
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if (user) {
                setPhone(user.phoneNumber);
                setName(user.displayName)
            }
        })
    })

    const UUID = ()=>{
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c === 'x' ? r :((r&0x3)|0x8)).toString(16);
        });
        return uuid;
    }
    console.log(UUID());


    return (
        <div style={{position: 'absolute', left: '50%', top: '50%', margin: '-150px 0 0 -150px', display: 'flex',flexDirection: 'column', color: 'white', gap: '1rem'}}>
            <span onClick={()=>setClickTest(true)}>50qustions/mois</span>
            <span onClick={()=>setClickSilver(true)}>200questions/mois</span>
            <span onClick={()=>setClickGold(true)}>illimité</span>
            <span onClick={paid}>payé</span>
        </div>
    );
};

export default Paid;