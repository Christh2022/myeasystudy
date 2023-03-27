import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { auth } from '../../firebase';
import './signup.css'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    //const [paid, setPaid] = useState(false)
    //const [image, setImage] = useState("")

    const signup= async (e)=>{
        e.preventDefault();

        try {
            if(name && password && email && phone){
                if(password === confirmPassword){
                    const credential = await createUserWithEmailAndPassword(auth, email, password)
                    const user = credential.user
                    updateProfile(user, {
                        displayName: name,
                        phoneNumber: phone,
                    })
                } else {
                    alert("les mots de passes ne sont pas identique")
                }
            }
        } catch (error) {
            console.log(error);
            alert("une erreur s'est produite lors de l'inscription")
        }
    }


    return (
        <div className="signup">
            <h1>S'inscrire</h1>
            <form method="post" onSubmit={signup}>
                <input type="text" placeholder="Name" required="required" onChange={(e)=>setName(e.target.value)} />
                <input type="email"  placeholder="Email" required="required" onChange={(e)=>setEmail(e.target.value)} />
                <input type="phone"  placeholder="Téléphone" required="required" onChange={(e)=>setPhone(e.target.value)} />
                <input type={showPassword? "text" : "password"} placeholder="Mot de passe" required="required" onChange={(e)=>setPassword(e.target.value)}/>
                <input type={showPassword? "text" : "password"} placeholder="conMot de passe" required="required" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', margin: '1rem 0'}}>
                    <input type="checkbox"  onClick={()=>setShowPassword(!showPassword)}/>
                    <span className="rol">Voir le mot de passe</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-large">inscription</button>
                <div style={{color: 'white',  margin: '1rem 0'}}>
                    <span>Vous avez déjà un compte ? <Link to='/'> connectez-vous</Link> </span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;