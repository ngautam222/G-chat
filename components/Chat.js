import styled from 'styled-components'
import React from 'react'
import { Avatar } from '@material-ui/core';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

function Chat({ id, users, }) {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(users, user);
    // console.log(db.collection('users').where ('email', '==', recipientEmail))
    const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", recipientEmail));

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()

    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL} />) : (<UserAvatar>
                    {recipientEmail[0]}
                </UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
display:flex;
align-items: center;
cursor:pointer;
padding: 15px;
word-break: break-word;
:hover{
    background-color: #e9e9e9
}

`;

const UserAvatar = styled(Avatar)`
margin:5px;
margin-right:15px;

`