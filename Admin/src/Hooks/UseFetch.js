import axios from "axios"
import {useState, useEffect} from "react"

const useFetch = (URL) =>
{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            setLoading(true)
            try{
            const res = await axios.get(URL)
            setData(res.data)
            }catch(err)
            {
                setError(err)
            }
            setLoading(false)
        }
        fetchData();
    },[URL])



const reFetch = async () =>
        {
            setLoading(true)
            try{
            const res = await axios.get(URL)
            setData(res.data)
            }catch(err)
            {
                setError(err)
            }
            setLoading(false)
        }
        return {data,loading,error,reFetch}
    }


    export default useFetch;