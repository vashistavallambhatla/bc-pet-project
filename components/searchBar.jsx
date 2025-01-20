import {useState,useEffect} from 'react'
import { TextField,List,ListItem,ListItemText,CircularProgress,Box } from '@mui/material'
import debounce from 'lodash.debounce'
import supabase from '../supabase/supabaseClient'
import {searchQueryAtom} from "../atoms/state/generalAtom"
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const [results,setResults] = useState([])
    const [searchQuery,setSearchQuery] = useRecoilState(searchQueryAtom)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const search = async(searchQuery) => {
        if(searchQuery.trim()==="" || !searchQuery) {
            setResults([])
            return
        }

        setLoading(true)
        try{
            const {data,error} = await supabase.from('products').select("id,name").ilike('name', `%${searchQuery}%`)

            if(error) throw new Error('Error while fetching the search results',error.message)
            console.log(data)
            setResults(data)
        } catch(error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    const debouncedSearch = debounce(search,500)

    const handleSearchChange = (e) => {
        const newQuery = e.target.value
        setSearchQuery(newQuery)
        debouncedSearch(newQuery)
    }

    useEffect(()=>{
        return () => {
            debouncedSearch.cancel()
        }
    },[])

    return (
        <Box sx={{position : "absolute",top : 10,left : "-90%"}}>
            <TextField
                variant="standard"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
            />
            {
                results.length > 0 && searchQuery && !loading && (
                    <List>
                        {
                            results.map((result) => (
                                <ListItem key={result.id} sx={{backgroundColor : "white",cursor : "pointer"}} onClick={()=>{navigate(`/product/${result.id}`)}}>
                                  <ListItemText primary={result.name} sx={{textTransform : "lowercase"}}/>
                                </ListItem>
                              ))
                        }
                    </List>
                )
            }
        </Box>
    )
}

export default SearchBar