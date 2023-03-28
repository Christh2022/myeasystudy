
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../../firebase';
import './signup.css'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()


    const signup= async (e)=>{
        e.preventDefault();

        try {
            if(name && password && email && phone){
                if(password === confirmPassword){
                    const credential = await createUserWithEmailAndPassword(auth, email, password)
                    const user = credential.user
                    updateProfile(user, {
                        displayName: name,
                        phoneNumber: phone
                        //photoURL: image
                    })
                    console.log(user);
                    navigate('/')
                } else {
                    setShowError(!showError)
                    setError("les mots de passes ne sont pas identique")
                }
            } else {
                setShowError(!showError)
                setError("veillez remplir tous les champs")
            }
        } catch (error) {
            console.log(error);
            setShowError(!showError)
            setError("une erreur s'est produite lors de l'inscription")
        }
    }

    const handleInput = ()=>{
        if(showError === true){
            setShowError(!showError)
        }
    }
    //console.log(phone);


    return (
        <div className="signup">
            <h1>S'inscrire</h1>
            <form method="post" onSubmit={signup}>
                <input type="text" placeholder="Name" onClick={handleInput} onChange={(e)=>setName(e.target.value)} />
                <input type="email"  placeholder="Email" onClick={handleInput}  onChange={(e)=>setEmail(e.target.value)} />
                <input type="text"  placeholder="Téléphone" onClick={handleInput}  onChange={(e)=>setPhone(e.target.value)} />
                <input type={showPassword? "text" : "password"} placeholder="Mot de passe" onClick={handleInput}  onChange={(e)=>setPassword(e.target.value)}/>
                <input type={showPassword? "text" : "password"} placeholder="Confirmation mot de passe" onClick={handleInput}  onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', margin: '1rem 0'}}>
                    <input type="checkbox"  onClick={()=>{
                        setShowPassword(!showPassword)
                        handleInput()
                        }}/>
                    <span className="rol">Voir le mot de passe</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-large">inscription</button>
                <div style={{color: 'white',  margin: '1rem 0'}}>
                    <span>Vous avez déjà un compte ? <Link to='/'> connectez-vous</Link> </span>
                </div>
                <div className={showError ? 'error show' : 'error hide'}>{error}</div>
            </form>
        </div>
    );
};

export default SignUp;