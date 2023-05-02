import React from 'react';
import './search.css'
import { auth, database } from '../../../firebase';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

const Search = ({userList, setShowUser , searchUser, setImage, setOtheruser}) => {
    const newTab = userList.filter( (el) => el.nom.toLowerCase().indexOf(searchUser.toLowerCase()) !== -1);
    const user = auth.currentUser;

    const handleSelect = async(findUserUid, photoURL, name)=>{
        //vérifier si la collection chats existe dans firestore, sinon créé une nouvelle collection
        const combinedId = 
            user.uid > findUserUid 
                ? user.uid + findUserUid
                : findUserUid + user.uid;
        console.log(photoURL);
        setImage(photoURL)
        setOtheruser(findUserUid)
        try {
            const res = await getDoc(doc(database, "chats", combinedId));
            if (!res.exists()) {
                //créé une nouvelle conversation dans la collection chat
                await setDoc(doc(database, 'chats', combinedId), {message: []})
            }
            //créé les conversations de l'utilisateurs
            await updateDoc(doc(database, "conversation", user.uid), {
                [combinedId+".userInfo"] : {
                    uid: findUserUid,
                    nom: name,
                    photoURL: photoURL
                },
                [combinedId+".date"]: serverTimestamp()
            })
            await updateDoc(doc(database, "conversation", findUserUid), {
                [combinedId+".userInfo"] : {
                    uid: user.uid,
                    nom: user.displayName,
                    photoURL: user.photoURL
                },
                [combinedId+".date"]: serverTimestamp()
            });
            setShowUser(true)
        } catch (error) {}
    }
    return (
        <div className='user_list'>
            {newTab.map((e)=>
                <div key={e.uid} onClick={()=>handleSelect(e.uid, e.photoURL, e.nom)}>
                    <img src={e.photoURL} alt="/" />
                    <span>{e.nom}</span>
                </div>
            )}

        </div>
    );
};

export default Search;