import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
    const [data, setData] = useState();
    const [error, setError] = useState();

    // Obtener las mascotas desde el backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/${endpoint}`, { withCredentials: true})
                if(response.status === 200) {
                    setData(response.data)
                }
            } catch (e) {
                setError(e)
            }
        };

        fetchData();
    }, [endpoint]);

    return [data, error]
}

export default useFetch