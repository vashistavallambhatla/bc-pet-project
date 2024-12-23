import supabase from "../../supabase/supabaseClient";
import { selector } from "recoil";
import { userState } from "./userAtom";

export const authStateSelector = selector({
    key : "authStateSelector",
    get : async({get}) => {
        const user = supabase.auth.getSession().session.user
        if(user){
            return user
        }
        return null
    },
    set: ({set},newUser) => {
        set(userState,newUser)
    }
})
