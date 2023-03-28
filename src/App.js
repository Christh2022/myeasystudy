import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './component/error/Error';
import Login from './component/Login/Login';
import Paid from './component/paidComponent/Paid';
import SignUp from './component/Signup/SignUp';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/*' element={<Error />}/>
        <Route path='/' element={<Paid/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
