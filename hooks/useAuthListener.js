import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import supabase from "../supabase/supabaseClient"
import { userState } from '../atoms/state/userAtom.js'

const useAuthListener = () => {
  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    const getInitialSession = async () => {
      const { data : { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    
    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription?.unsubscribe()
  }, [setUser])
}

export default useAuthListener