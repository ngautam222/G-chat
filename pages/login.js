import { Button } from '@material-ui/core';
import Head from 'next/head'
import styled from 'styled-components'
import { auth, provider } from '../firebase';
function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LogContainer>
                <Logo src='http://cdn.onlinewebfonts.com/svg/img_397748.png'></Logo>
                <h2>Welcome to G-Chat</h2>
                <Button onClick={signIn}>Sign in with Google</Button>
            </LogContainer>
        </Container>
    )
}

export default Login
const LogContainer = styled.div`
padding: 100px;
background-color: white;
display: flex;
flex-direction: column;
border-radius: 5px;
box-shadow: 5px;

`;
const Logo = styled.img`
height: 100px;
width: 100px;
margin-bottom: 50px;
`

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
 background: linear-gradient(90deg,#FFFF00 6%,#FFA500 25%,#F14444 45%,#D53567 55%,#9A109A 94%) ;
`