import { signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react';
import { auth } from '../../firebase';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e)=>{
        e.preventDefault()

        try {
            const credential = await signInWithEmailAndPassword(auth, email, password)
            alert("connexion reussie")
        } catch (error) {
            alert("connexion echoué")
            console.log(error);
        }
    }

    return (
        <div className="login">
            <h1>Se connecter</h1>
            <form method="post" onSubmit={login}>
                <input type="text" name="u" placeholder="Email" required="required" />
                <input type="password" name="p" placeholder="Mot de passe" required="required" />
                <button type="submit" className="btn btn-primary btn-block btn-large">connexion</button>
            </form>
        </div>
    );
};

export default Login;