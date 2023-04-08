import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate()
    const handleGoBack = ()=>{
        navigate('/login')
    }
    const [status, setStatus] = useState()

    useEffect(() => {
        if(status !== 0){
           console.log(status);
           axios.post('http://localhost:5000/callback', 
           )
           .then(response => {
           //setMaVariable(purchaseToken);
                setStatus(response)
                console.log(response);
           })
           .catch(error => {
             console.log(error);
           });
        }
       }, [status]);
    return (
        <div onClick={handleGoBack} style={{color: 'white', padding: '5rem', cursor: 'pointer'}}>
            connecte-toi
        </div>
    );
};

export default Error;