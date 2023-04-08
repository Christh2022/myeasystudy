import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './component/Chatcomponent/Chat';
// import Error from './component/error/Error';
import Login from './component/Login/Login';
import Paid from './component/paidComponent/Paid';
import SignUp from './component/Signup/SignUp';


function App() {
  const [purchaseToken, setPurchaseToken] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/chat' element={<Chat purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp />}/>
        {/* <Route path='/*' element={<Error />}/> */}
        <Route path='/' element={<Paid purchaseToken={purchaseToken} setPurchaseToken={setPurchaseToken}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
