import { useState, useEffect } from 'react'
import { searchAPI } from './api/youtube'

const useVideos = (searchTerm) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        search(searchTerm);
    }, [searchTerm]);

    const search = async term => {
        const response = await searchAPI.get('/search', {
            params: {
                q: term
            }
        });
        
        setVideos(response.data.items);
        console.log(response)
    }

    return [videos, search];
}

export default useVideos;