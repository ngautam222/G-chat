import styled from 'styled-components'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticonRounded, MicSharp, MoreVertSharp } from '@material-ui/icons'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import Message from '../components/Message'
import getRecipientEmail from '../utils/getRecipientEmail'
import TimeAgo from 'timeago-react'
// import { start } from 'repl'

function ChatScreen({ chat, messages }) {
    // console.log("///")
    // console.log(messages)
    const [user] = useAuthState(auth)
    const router = useRouter();
    const endRef = useRef(null);
    const [input, setInput] = useState("")

    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'))
    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email', '==', getRecipientEmail(chat.users, user))
    )
    const scroll = () => {
        endRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    const showChats = () => {
        if (messagesSnapshot) {
            console.log("here")
            return messagesSnapshot.docs.map(message => (
                <Message
                    chat={chat}
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime()
                    }} />
            ))
        } else {
            console.log("else")
            return JSON.parse(messages).map(message => (
                <Message
                    chat={
                        chat
                    }
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    }
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }
        )
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        })
        setInput("");
        scroll();
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user)
    return (
        <Container>
            <Header>
                {recipient ? (<Avatar src={recipient?.photoURL} />) :
                    (
                        <Avatar>{recipientEmail[0]}</Avatar>
                    )

                }

                <Info>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>last seen:{' '}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            ) : ("unavailable")}

                        </p>
                    ) : (<p>Loading last seen ..</p>)

                    }

                </Info>
                <HeaderIcon>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertSharp />
                    </IconButton>


                </HeaderIcon>

            </Header>
            <MesCont>
                {/* <p>noo</p> */}
                {showChats()}
                <Endmes ref={endRef} />
            </MesCont>
            <InputContainer placeholder="hello">
                <InsertEmoticonRounded />
                {/* <Message user='yoo' message="plxx" /> */}
                <Input value={input} onChange={x => setInput(x.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send</button>
                <MicSharp />
            </InputContainer>


        </Container>
    )
}

export default ChatScreen

const Container = styled.div``
const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top:0;
display: flex;
padding:11px;
align-items: center;
border-bottom: 1px solid whitesmoke;
`

const Info = styled.div`
 margin-left:15px;
 flex:1;
> h3{
    margin-bottom: 3px;

}
> p{
    font-size:14px;
    color:gray; 
}

`
const HeaderIcon = styled.div``;

const MesCont = styled.div`
padding: 30px;
background-color: oldlace;
min-height: 90vh;
`
const Endmes = styled.div`
margin-bottom: 50px;
`
const InputContainer = styled.form`
display: flex;
align-items: center;
padding:10px;
position: sticky;
bottom:0;
background-color: white;
z-index: 100;
`
const Input = styled.input`
flex:1;
align-items: center;
padding: 10px;
position: sticky;
z-index: 100;
bottom: 0;
background-color: whitesmoke;
margin-right: 15px;
margin-left:15px;
border-radius: 10px;
`