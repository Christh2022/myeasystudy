import React, { useEffect, useState } from 'react';
import './profilecomponent.css'
import {AiFillEyeInvisible} from 'react-icons/ai'
import {BsEyeFill} from 'react-icons/bs'
import { onAuthStateChanged, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { auth, database } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ProfileComponent = ({name, email}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [tel, setTel] = useState("");
    const [question, setQuestion] = useState(0);
    const [formule, setFormule] = useState("");
    const [limit, setLimit] = useState(0);
    const [newEmail, setNewEmail] = useState("");
    const [newName, setNewName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newTel, setNewTel] = useState("")

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const userId = user.uid;
                const usersRef = doc(database, "utilisateur", userId);
                getDoc(usersRef).then((value) => {
                    if(value.exists()){
                        setTel(value.data().tel);
                        setQuestion(value.data().question);
                        setFormule(value.data().formule)
                    }
                })
            }
        })
    })

    useEffect(()=>{
        if(question !== 0 && formule){
            if(formule === 'Starter'){
                setLimit(150)
            } else if(formule === 'Basic'){
                setLimit(300)
            } else if(formule === 'VIP'){
                setLimit(750)
            }  else if(formule === 'Prenium'){
                setLimit(1000)
            }
        }
    }, [question, formule])
    
    const handleEmail = async ()=>{
        if(newEmail){
            try {
                await updateEmail(auth.currentUser, newEmail)
                updateDoc(doc(database, 'utilisateur', auth.currentUser.uid), {
                    email: newEmail
                })
                updateProfile(auth.currentUser, {
                    email: newEmail,
                })
                window.location.reload();
            } catch (error) {
            console.log(error); 
            }
        } else {
            alert('veuillez remplir le champ mot de passe avant de cliquez sur enrisgistrer')
        }
    }

    const handleName = async ()=>{
        if(newName){
            try {
                updateDoc(doc(database, 'utilisateur', auth.currentUser.uid), {
                    nom: newName
                })
                updateProfile(auth.currentUser, {
                    displayName: newName,
                })
                window.location.reload();
            } catch (error) {
            console.log(error); 
            }
        } else {
            alert('veuillez remplir le champ Nom avant de cliquez sur enrisgistrer')
        }
    }

    const handlePassword= async ()=>{
        if (newPassword) {
            try {
                updatePassword(auth.currentUser, newPassword)
                window.location.reload();
            } catch (error) {
               console.log(error); 
            }
        } else {
            alert('veuillez remplir le champ mot de passe avant de cliquez sur enrisgistrer')
        }
    }

    const handleTel = async ()=>{
        if(newTel){
            try {
                updateDoc(doc(database, 'utilisateur', auth.currentUser.uid), {
                    tel: newTel
                })
                window.location.reload();
            } catch (error) {
            console.log(error); 
            }
        } else {
            alert('veuillez remplir le champ téléphone avant de cliquez sur enrisgistrer')
        }
    }

    return (
        <div className='chat_wrapper_profile'>
            <form className='chat_wrapper_profile_form'>
                <div className='chat_wrapper_profil_name'>
                    <span>Nom : {name} </span>
                    <input type="text" onChange={(e)=>setNewName(e.target.value)} placeholder='Mark Junior' />
                    <span onClick={handleName} className='info_save' >save</span>
                </div>
                <div className='chat_wrapper_profil_email'>
                    <span>Email : {email} </span>
                    <input type="email" onChange={(e)=>setNewEmail(e.target.value)} placeholder='example@gmail.com'/>
                    <span onClick={handleEmail} className='info_save' >save</span>
                </div>
                <div className='chat_wrapper_profil_psw'>
                    <span className="psw">Mot de passe : ********** </span>
                    <input type={showPassword? "text" : "password"} onChange={(e)=>setNewPassword(e.target.value)} placeholder='Mot de passe' />
                    <span style={{color: '#a2a3abb1',position: 'absolute', right: '4rem', left: 'auto', cursor: 'pointer',width: '2rem'}} onClick={()=>setShowPassword(!showPassword)}>
                        {!showPassword? <AiFillEyeInvisible/> : <BsEyeFill/>}
                    </span>
                    <span onClick={handlePassword} className='info_save' >save</span>
                </div>
                <div className='chat_wrapper_profil_tel'>
                    <span>Tel : {tel} </span>
                    <input type="text" onChange={(e)=>setNewTel(e.target.value)} placeholder='06 000 00 00'/>
                    <span onClick={handleTel} className='info_save'>save</span>
                </div>
                <div className='chat_wrapper_profil_formule'>
                    <span>Formule choisie : {formule} </span>
                    <span>Nombre de question : {limit} </span>
                    <span>Nombre de question restant : {limit - question}  </span>
                </div>
            </form>
        </div>
    );
};

export default ProfileComponent;