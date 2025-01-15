import { Container } from "@mui/material"
import BestSellers from "../components/bestSellers"
import CoffeeForEveryOne from "../components/coffeeForEveryone"
import { ClipLoader } from "react-spinners"
import { useState,useEffect } from "react"
import supabase from "../supabase/supabaseClient"


const HomePage = () => {
    const [loading,setLoading] = useState(true)
    const [bestsellers,setBestsellers] = useState([])

    useEffect(()=>{
        const getBestsellers = async () => {
            try {
                const {data,error} = await supabase.from("products").select("*").eq("bestseller","TRUE")
                if(error) throw new Error("Error while fetching bestsellers",error.message)
                setBestsellers(data)
            } catch(error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        } 
        getBestsellers()
    },[])

    if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader />
          </div>
        );
    }

    return (
        <Container maxWidth={false} >
            <BestSellers bestsellers={bestsellers}/>
            <CoffeeForEveryOne/>
        </Container>
    )
}

export default HomePage