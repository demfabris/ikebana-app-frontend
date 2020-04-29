import React, { useState, useEffect } from 'react';
import api from 'services/api';

import './styles.scss';

export default function AutorCard({id}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(false);

    const fetchPublicInfo = async (proj_id) => {
        try {
            const response = await api({
                method: 'get',
                url: `/autor_public/${proj_id}`
            })
            setData(response.data)
            console.log(response.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPublicInfo(id)
    },[])

    return(
        <>
        <div className="autor-card">
            {
                loading ?
                    <div className="lds-dual-ring"></div>
                        :
                    <div className="autor-card__main">
                        <h1 className="autor-card__main--name">
                        {data.fullname.toLowerCase()}</h1>
                        <h2 className="autor-card__main--city">-{data.city}</h2>
                        <div className="autor-card__main--desc">
                            <p className="autor-card__main--desc--text">
                                {data.bio}
                            </p>
                        </div>
                    </div>
            }
        </div>
        </>
    );
}
