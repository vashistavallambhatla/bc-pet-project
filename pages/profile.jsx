import { useRecoilValue } from "recoil"
import SignIn from "../auth/login"
import { userState } from "../atoms/state/userAtom"
import { Container } from "@mui/material"


const Profile = () => {
    const user = useRecoilValue(userState)
    
    if(!user) return <SignIn/>
    
    return (
        <Container maxWidth={false}>

        </Container>
    )
}

export default Profile