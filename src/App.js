import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Login/Login';
import Paid from './component/paidComponent/Paid';
import SignUp from './component/Signup/SignUp';
import Chatpage from './Pages/Chatpage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import logo from './assets/user-g8bc25d40d_1280.png'
import Profile from './Pages/Profile';
import Exercicsepage from './Pages/Exercicsepage';

function App() {
  const [purchaseToken, setPurchaseToken] = useState(null);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userImage, setUserImage] = useState("");
  const [user, setUser] = useState('')

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user) {
        setName(user.displayName)
        setEmail(user.email)
        setUser(user)
        if (user.photoURL) {
          setUserImage(user.photoURL)
        } else {
          setUserImage(logo)
        }
      }
    })
  }, [email, name])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/exercice' element={<Exercicsepage user={user} userImage={userImage} name={name} email={email}/>}/>
        <Route path='/profile' element={<Profile user={user} userImage={userImage} name={name} email={email}/>}/>
        <Route path='/chat' element={<Chatpage user={user} userImage={userImage} name={name} email={email}  purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken}/>}/>
        <Route path='/login' element={<Login purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken}/>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/*' element={<Chatpage purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken}/>}/>
        <Route path='/' element={<Paid purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
