import {useEffect} from "react"
import { useSetRecoilState } from "recoil"
import supabase from "../supabase/supabaseClient"
import {userState} from '../atoms/state/userAtom.js'

const useAuthListener = () => {
    const setUser = useSetRecoilState(userState)



    useEffect(()=>{
        const getInitialSession = async() => {
            const response = await supabase.auth.getSession();
            console.log(response.data.session.user)
            setUser(response.data.session.user.email)
        }

        getInitialSession()

        const {data : authListener} = supabase.auth.onAuthStateChange((event,session)=>{
            if(session?.user){
                setUser(session.user)
            }else {
                setUser(null)
            }
        })

    },[setUser])
}

export default useAuthListener