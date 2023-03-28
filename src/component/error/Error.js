import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate()
    const handleGoBack = ()=>{
        navigate('/login')
    }
    return (
        <div onClick={handleGoBack} style={{color: 'white', padding: '5rem', cursor: 'pointer'}}>
            connecte-toi
        </div>
    );
};

export default Error;