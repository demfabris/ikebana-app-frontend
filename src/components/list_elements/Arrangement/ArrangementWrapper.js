import React, { useState, useEffect } from 'react';
import ArrangementDisplay from './ArrangementDisplay';
import api from '../../../services/api';
import { useSelector, useDispatch } from 'react-redux';

import EmptyDisplay from '../Empty/EmptyDisplay';

import './styles.scss';

export default function ArrangementWrapper() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const authKey = useSelector(state => state.auth.keys)

    const fetchProjects = async (key=authKey) => {
        setLoading(true)
        try {
            const response = await api({
                method: 'get',
                url: '/projects',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
            })
            setData(response.data.filter( (pj) => pj.type == 'arrangement' ))
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    },[])

    //<div class="lds-dual-ring"></div>
    
    return(
        <div className={`arr-wrapper ${data.length === 0 ? 'wrapper-center' : ''}`}>
            {
                loading ?
                    <div className="lds-dual-ring"></div>
                    :
                data.map((el, key) => (
                    <ArrangementDisplay key={key} {...el}/>
                ))
            }
            {
                !loading && data.length === 0 && 
                    <EmptyDisplay />
            }
        </div>
    );
}
