import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Login/Login';
import Paid from './component/paidComponent/Paid';
import SignUp from './component/Signup/SignUp';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/payement' element={<Paid/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
