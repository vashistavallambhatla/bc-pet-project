import supabase from "../supabase/supabaseClient"
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Card from "../components/card";
import { Container,Box } from "@mui/material";
import { ClipLoader } from "react-spinners";

const Search = () => {
    const [loading,setLoading] = useState(true)
    const [searchResults,setSearchResults] = useState([])
    const { searchQuery } = useParams()

    useEffect(() => {
        const fetchSearchResult = async() => {
            try {
                const {data,error} = await supabase.from('products').select("*").ilike('name', `%${searchQuery}%`)
                if(error) throw new Error("Error fetching searched results",error.message)
                console.log(data)
                setSearchResults(data)
            }
            catch(error){
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchSearchResult()
    },[searchQuery])

    if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader />
          </div>
        );
    }

    if(searchResults.length===0) return <div style={{display : "flex",justifyContent : "center",alignItems : "center",height : "80vh",fontWeight : "bolder",fontSize : "2rem"}}>{`No products found :(`}</div>

    return (
        <Container maxWidth={false} sx={{display : "flex",justifyContent : "center",marginTop : "5rem"}}>
            <Box sx={{display : "flex",flexWrap : "wrap",gap : "2rem",width : "100%",justifyContent : "center"}}>
                {   searchResults && 
                    searchResults.map(product => (
                        <Box key={product.id}>
                            <Card product={product}/>
                        </Box>
                    ))
                }
            </Box>
        </Container>
    )
}

export default Search