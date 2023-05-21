import React, { useState } from 'react';
import {BsFillImageFill} from 'react-icons/bs';
import {RiSendPlaneFill} from 'react-icons/ri';
import './input.css'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, database, storage } from '../../../firebase';
import {v4 as uuid} from "uuid"
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

const Input = ({chatid, otherUser}) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const user = auth.currentUser

    const handleSend = async(chatId)=>{
        if(image){
            const filename = `images/${user.uid}-${image.name}-${uuid()}`;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed', 
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(async(link)=>{
                        await updateDoc(doc(database, "chats", chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                // text,
                                senderId: user.uid,
                                date: Timestamp.now(),
                                img: link
                            })
                        })
                    })
            })
        } else {
            await updateDoc(doc(database, "chats", chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: user.uid,
                    date: Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(database, 'conversation', otherUser), {
            [chatId+'.lastMessage'] : {
                text
            },
            [chatId+'.date'] : serverTimestamp(),
        })

        await updateDoc(doc(database, 'conversation', user.uid), {
            [chatId+'.lastMessage'] : {
                text
            },
            [chatId+'.date'] : serverTimestamp(),
        })
        console.log("hello");

        setText("")
        setImage("")
    }
    return (
        <form  className="input_chat" onSubmit={(e)=>{e.preventDefault(); handleSend(chatid)}}>
            <input type="text" value={text} placeholder='envoyer un message' onChange={(e)=>setText(e.target.value)} />
            <div className="send">
                <input type="file" id='file' style={{display: 'none'}} onChange={(e)=>setImage(e.target.files[0])} />
                <label htmlFor='file'><BsFillImageFill/></label>
                <button type='submit'><RiSendPlaneFill/></button>
            </div>
        </form >
    );
};

export default Input;