import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc} from 'firebase/firestore';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { auth, database, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
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
    const [status, setStatus] = useState(1)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const UUID = ()=>{
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
        });
    }

    const signup= async (e)=>{
        e.preventDefault();

        try {
            if(name && password && email && phone){
                if(password === confirmPassword){
                    const credential = await createUserWithEmailAndPassword(auth, email, password)
                    const user = credential.user
                    
                    updateProfile(user, {
                        displayName: name,
                    })

                    setDoc(doc(database, "utilisateur", user.uid), {
                        nom : name,
                        email: user.email,
                        status: status,
                        tel : phone,
                        Payement: false,
                        formule: undefined,
                        prix: "0 FCFA",
                        question: 0
                    })
                    sendEmailVerification(user)

                    const storageImage = async (image)=>{
                        return  new Promise ((resolve, reject)=>{
                            const filename = `images/${user.uid}-${image.name}-${UUID()}`
                            const storageRef = ref(storage, filename);
                            const uploadTask = uploadBytesResumable(storageRef, image)
                            uploadTask.on('state_changed', 
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload is paused');
                                            break;
                                        case 'running':
                                            console.log('Upload is running');
                                            break;
                                            default: ;
                                    }
                                }, 
                                (error) => {
                                    // Handle unsuccessful uploads
                                    reject(error)
                                }, 
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                                        resolve(downloadURL);
                                        await updateProfile(user, {
                                            displayName : name,
                                            photoURL : downloadURL, 
                                        })
                                    });
                                }
                            );
                        })
                    }
                    storageImage(file)
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
            setStatus(0)
        }
    }

    const handleInput = ()=>{
        if(showError === true){
            setShowError(!showError)
        }
    }

    return (
        <div className='authentification'>
            <div className="signup">
                <h1>S'inscrire</h1>
                <form method="post" onSubmit={signup}>
                    <input type="text" placeholder="Name" onClick={handleInput} onChange={(e)=>setName(e.target.value)} />
                    <input type="email"  placeholder="Email" onClick={handleInput}  onChange={(e)=>setEmail(e.target.value)} />
                    <input type="text"  placeholder="Téléphone" onClick={handleInput}  onChange={(e)=>setPhone(e.target.value)} />
                    <input type="file" onChange={(e)=>setFile(e.target.files[0])} accept='.jpeg, .png, .jpg'/>
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
        </div>
    );
};

export default SignUp;