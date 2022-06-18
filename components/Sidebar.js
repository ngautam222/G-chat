import { Avatar, Button, IconButton } from '@material-ui/core';
import { Chat as Ch, MoreVert, SearchSharp } from '@material-ui/icons';
// import ChatIcon from '@material-ui/icons/chat/MoreVert'
import styled from 'styled-components'
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from '../components/Chat'
function Sidebar() {
    const [user] = useAuthState(auth)
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatsSnapshot] = useCollection(userChatRef)


    const createChat = () => {
        const input = prompt('Enter an email address for the user you want to chat with ')
        if (!input) return null;

        if (EmailValidator.validate(input) && input !== user.email && !chatexists(input)) {
            db.collection('chats').add({
                users: [user.email, input]
            });

        }

    }
    const chatexists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(chat => chat.data().users.find((user) => user === recipientEmail)?.length > 0)



    return (
        <Container>
            <Header>
                <UAvatar onClick={() => auth.signOut()} src={user.photoURL} />
                <IconDiv>
                    <IconButton><Ch /></IconButton>
                    <IconButton>  <MoreVert /></IconButton>

                </IconDiv>
            </Header>
            <Search>
                <SearchSharp />
                <SearchInput placeholder="search" />
            </Search>
            <SideButton onClick={createChat}>New Chat</SideButton>
            {/* chatsss */}
            {chatsSnapshot?.docs.map(
                chat => (
                    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                )
            )}
        </Container>
    )
}

export default Sidebar
const SideButton = styled(Button)`
width:100%;
&&&{
border-top: 1px solid whitesmoke;
border-bottom: 1px solid whitesmoke;
}

`
const SearchInput = styled.input`
outline-width: 0;
border: none;
flex:1;
`;

const Search = styled.div`
display: flex;
align-items: center;
padding:25px;
border-radius:3px
`;

const Container = styled.div`
flex:0.5;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
max-width: 350px;
overflow-y: scroll;
`;

const Header = styled.div`
display: flex;
position:sticky;
top:0;
background-color: white;
z-index: 1;
justify-content: space-between;
align-items:center;
padding :15px;
height: 90px;
border-bottom: 1px solid whitesmoke;
`;

const UAvatar = styled(Avatar)`
cursor: pointer;
:hover{
    opacity: 0.7;
}
`;
const IconDiv = styled.div``;