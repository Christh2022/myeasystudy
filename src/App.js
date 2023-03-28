import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Login/Login';
import Paid from './component/paidComponent/Paid';
import SignUp from './component/Signup/SignUp';


function App() {
  const [token, setToken] = useState("");
  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path={`/signup/${token}`} element={<SignUp />}/>
        <Route path='/' element={<Paid setToken={setToken}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
