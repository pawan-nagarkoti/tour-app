import Tour from './Tour';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tours = () => {
    const apiUrl = 'https://course-api.com/react-tours-project';
    const [data, setData] = useState();
    const getApiData = async () => {
        const response = await axios.get(apiUrl);
        setData(response.data)
    }
    useEffect(() => {
        getApiData();
    }, [])
    if (!data) return 'Loading...'
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                {
                    data.map((value) => <Tour key={value.id} {...value} />)
                }
            </div>
        </>
    )
}

export default Tours