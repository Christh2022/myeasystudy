import { signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react';
import { auth } from '../../firebase';
import {Link, useNavigate} from 'react-router-dom'
import './login.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const login = async (e)=>{
        e.preventDefault()

        try {
            const credential = await signInWithEmailAndPassword(auth, email, password)
            alert("connexion reussie")
            console.log(credential.user);
            navigate('/chat')
        } catch (error) {
            alert("connexion echoué")
            console.log(error);
        }
    }


    return (
        <div className="login">
            <h1>Se connecter</h1>
            <form method="post" onSubmit={login}>
                <input type="email" name="u" placeholder="Email" required="required" onChange={(e)=>setEmail(e.target.value)} />
                <input type={showPassword? "text" : "password"} name="p" placeholder="Mot de passe" required="required" onChange={(e)=>setPassword(e.target.value)}/>
                <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', margin: '1rem 0'}}>
                    <input type="checkbox" name='C' onClick={()=>setShowPassword(!showPassword)}/>
                    <span className="rol">Voir le mot de passe</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-large">connexion</button>
                <div style={{color: 'white',  margin: '1rem 0'}}>
                    <span>Vous n'avez pas encore de compte ? <Link to='/signup'> inscrivez-vous</Link> </span>
                </div>
            </form>
        </div>
    );
};

export default Login;