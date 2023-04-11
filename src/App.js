import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Error from './component/error/Error';
import Login from './component/Login/Login';
import Paid from './component/paidComponent/Paid';
import SignUp from './component/Signup/SignUp';
import Chatpage from './Pages/Chatpage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import logo from './assets/user-g8bc25d40d_1280.png'


function App() {
  const [purchaseToken, setPurchaseToken] = useState(null);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userImage, setUserImage] = useState("")

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user) {
        setName(user.displayName)
        setEmail(user.email)
        if (user.photoURL) {
          setUserImage(user.photoURL)
        } else {
          setUserImage(logo)
        }
      }
    })
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/chat' element={<Chatpage userImage={userImage} name={name} email={email}  purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken}/>}/>
        <Route path='/login' element={<Login purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken}/>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/*' element={<Chatpage purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken}/>}/>
        <Route path='/' element={<Paid purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
