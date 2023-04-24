import React, { useContext, useState } from 'react'
import {RiSendPlaneFill} from 'react-icons/ri'
import {MdOutlineAttachFile} from 'react-icons/md'
import {BsFillImageFill} from 'react-icons/bs'
import { auth, database, storage } from '../../../firebase'
import { ChatContext } from '../ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {
    const [text, setText] = useState();
    const [img, setImg] = useState(null);
    const user = auth.currentUser;
    const {data} = useContext(ChatContext);
    console.log(data.chatId);

    const handleSend = async()=>{
        
        if(img) {
            const storageRef = ref(storage, uuid())

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error)=>{

                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(async(link)=>{
                        await updateDoc(doc(database, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: user.uid,
                                date: Timestamp.now(),
                                img: link
                            })
                        })
                    })
            })
        } else {
            await updateDoc(doc(database, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: user.uid,
                    date: Timestamp.now()
                })
            })
        }
        await updateDoc(doc(database, 'conversation', user.uid), {
            [data.chatId+".lastMessage"]: {
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })

        await updateDoc(doc(database, 'conversation', data.user.uid), {
            [data.chatId+".lastMessage"]: {
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })

        setText("");
        setImg(null)
    }

    return (
        <div className='input'>
            <input type="text" value={text} placeholder='envoyer un message' onChange={(e)=>setText(e.target.value)} />
            <div className="send">
                <span><MdOutlineAttachFile/></span>
                <input type="file" style={{display: 'none'}} id='file' onChange={(e)=>setImg(e.target.files[0])} />
                <label htmlFor='file'><BsFillImageFill/></label>
                <span className='envoie' onClick={handleSend}><RiSendPlaneFill/></span>
            </div>
        </div>
    )
}

export default Input