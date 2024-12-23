import { useRecoilState } from "recoil"
import { authState } from "../atoms/authAtom.js"

export const useAuth = () => {
    const [auth,setAuth] =  useRecoilState(authState)

    const login = (user) => {
        const authObj = {isAuthenticated : true, user}
        setAuth(authObj)
        try{
            localStorage.setItem("authState",JSON.stringify(authObj))
        } catch(error) {
            console.log(`Error saving auth state to local storage : ${error}`)
        }
    }

    const logout = () => {
        setAuth({isAuthenticated : false, user : null})
        try{
            localStorage.removeItem("authState")
        } catch(error) {
            console.log(`Error clearing auth state from local storage : ${error}`)
        }
    }

    return {auth,login,logout}
}





