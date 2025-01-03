import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/state/userAtom";


const AuthRoutes = () => {
    const user = useRecoilValue(userState)
    return user ? <Navigate to="/profile"/> : <Outlet/>
  }
  

export { AuthRoutes }