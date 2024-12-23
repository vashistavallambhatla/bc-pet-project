import { useRecoilValue } from "recoil"
import SignIn from "../auth/login"
import { userState } from "../atoms/state/userAtom"


const Profile = () => {
    const user = useRecoilValue(userState)

    if(!user) return <SignIn/>
    
    return (
        <div style={{color:"black"}}>Profile</div>
    )
}

export default Profile