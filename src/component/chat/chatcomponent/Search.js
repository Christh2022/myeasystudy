import React, { useState } from 'react';
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from 'firebase/firestore'
import {auth, database} from '../../../firebase'

const Search = ({handleSidebar}) => {
    const [username, setUsername] = useState("");
    const [userfind, setUserfind] = useState(null);
    const [err, setErr] = useState(false);
    const user = auth.currentUser

    const handleSearch = async()=>{
        const q = query (collection(database, "utilisateur"), where("nom", "==", username));
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc)=>{
            setUserfind(doc.data())
          }) 
          if (window.innerWidth <= 460) {
           handleSidebar()
        }
        } catch (error) {
            console.log(error);
            setErr(true)
        }
    }

    const handlekey = (e)=>{
        e.code === 'Enter' &&  handleSearch();
    }

    const handleSelect = async()=>{
        //vérifier si la collection chats existe dans firestore, sinon créé une nouvelle collection
        const combinedId = 
            user.uid > userfind.uid 
                ?  user.uid + userfind.uid 
                : userfind.uid + user.uid
        try {
            const res = await getDoc(doc(database, "chats", combinedId))

            if(!res.exists()){
                //créé une nouvelle conversation dans la collection chat
                await setDoc(doc(database, "chats", combinedId), {messages: []})

                //créé les conversations de l'utilisateurs
                await updateDoc(doc(database, "conversation", user.uid), {
                    [combinedId+".userInfo"] : {
                        uid: userfind.uid,
                        nom: userfind.nom,
                        photoURL: userfind.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                })

                console.log(userfind.uid);
                await updateDoc(doc(database, "conversation", userfind.uid), {
                    [combinedId+".userInfo"] : {
                        uid: user.uid,
                        nom: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
                console.log("hello");
            }
        } catch (error) { console.log(error); }
        //créé un nouvel
        setUserfind(null)
        setUsername("")
    }
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" value={username} placeholder='Trouver un utilisateur' onKeyDown={handlekey} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            {err && <span>Aucun utilisateur trouvé</span>}
            {userfind && <div className='userChat' onClick={handleSelect}>
                <img src={userfind.photoURL} alt="/" />
                <div className='userChatInfo'>
                    <span>{userfind.nom}</span>
                </div>
            </div>}
        </div>
    );
};

export default Search;