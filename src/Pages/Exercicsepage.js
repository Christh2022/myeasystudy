import React, { useEffect, useState } from 'react';
import SideBar from '../component/sidebarComponent/SideBar';
import Header from '../component/Header/Header';
import Exercise from '../component/exercise/Exercise';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { database } from '../firebase';
import Search from '../component/exercise/exerciseComponent/SearchUsers';
import { useNavigate } from 'react-router-dom';


const Exercicsepage = ({user, name, email, userImage}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [searchUser, setSearchUser] = useState("H");
    const [userFind, setUserFind] = useState(false);
    const [userList, setUserList] = useState([]);
    const [showUser, setShowUser] = useState(true);
    const [otherUser, setOtheruser] = useState("");
    const [showChatUser, setShowChatUser] = useState(true);
    const [image, setImage] = useState(null);
    const navigate = useNavigate()

    const handleSearch = async()=>{
        const q = query(collection(database, "utilisateur"), orderBy("nom", 'desc'));
        try {
            onSnapshot(q, (snapShot)=>{
                let tab = []
                snapShot.forEach((e)=>{
                    tab.push({...e.data()})
                })
                setUserList(tab)
            })
        } catch (error) {console.log(error)}
    }

    useEffect(()=>{
        !user && navigate('/login')  
    })

    return (
        <>
            <div  style={{width: '100%', height: '100vh'}}>
                <div style={showMenu? {filter: ' blur(2px)'} : null}>
                    <Header  
                        userImage={userImage} 
                        userFind={userFind} 
                        setUserFind={setUserFind} 
                        showMenu={showMenu} 
                        handleSearch={handleSearch} 
                        searchUser={searchUser}  
                        setSearchUser={setSearchUser} 
                        setShowMenu={setShowMenu}
                        showUser={showUser} 
                        setShowUser={setShowUser}
                        setShowChatUser={setShowChatUser}
                        showChatUser={showChatUser} />
                    <Exercise image ={image} setImage={setImage} otherUser={otherUser} setShowChatUser={setShowChatUser} showChatUser={showChatUser} setOtheruser={setOtheruser} showUser={showUser} setShowUser={setShowUser} userImage={userImage}/>
                </div>
                <SideBar name={name} email={email} showMenu={showMenu} setShowMenu={setShowMenu}/>
            </div>
            {userFind && <Search setShowUser={setShowUser} setShowChatUser={setShowChatUser} setImage={setImage} setOtheruser={setOtheruser} userList={userList} searchUser={searchUser}/>}
        </>
    );
};

export default Exercicsepage;