import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase'

function Message({ user, message }) {
    const [userLog] = useAuthState(auth);

    const TypeofMessage = (user == userLog.email) ? Sender : Recv;

    return (
        <Container>

            <TypeofMessage>{message.message}
                <Time>
                    {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
                </Time>
            </TypeofMessage>

        </Container>
    )
}

export default Message

const Container = styled.div``

const MessageElement = styled.p`

width:fit-content;
padding:15px;
border-radius: 8px;
margin:10px;
min-width: 80px;
text-align: right;
font-size:20px;
position: relative;
`

const Sender = styled(MessageElement)`
margin-left: auto;
background-color: black;
color: white;
`
const Recv = styled(MessageElement)`
background-color: whitesmoke;
text-align: left;
color:black

`
const Time = styled.span`
color: grey;
padding: 10px;
/* margin-top: 10px;
padding-top: 10px; */
font-size: 9px;
position: relative;
bottom: 0;
text-align: right;
right:0;
`