import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/card";
import { Container,Box } from "@mui/material";
import supabase from "../supabase/supabaseClient";

const Collections = () => {
    const { collection } = useParams()
    const [products,setProducts] = useState(null)

    useEffect(()=>{
        const fetchCollections = async() => {
            const {data : collections,error : collectionError} = await supabase.from('products').select("*").eq("category",collection)
            if(collectionError) throw new Error(`Error fetching collection ${collection} : ${collectionError}`)
            if(!collections || collections.length===0) throw new Error(`No collections found`)
            console.log(collections)
            setProducts(collections)
        }

        fetchCollections()
    },[])

    if(!products) return <div>No collection found</div>

    return (
        <Container maxWidth={false} sx={{display : "flex",justifyContent : "center",marginTop : "5rem"}}>
            <Box sx={{display : "flex",flexWrap : "wrap",gap : "2rem",width : "100%",justifyContent : "center"}}>
                {   products && 
                    products.map(product => (
                        <Box key={product.id}>
                            <Card product={product}/>
                        </Box>
                    ))
                }
            </Box>
        </Container>
    )
}

export default Collections;