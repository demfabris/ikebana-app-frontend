import React, { useEffect, useState } from 'react';
import api from 'services/api';
import { useSelector } from 'react-redux';

import './styles.scss';

import LessonCard from '../../cards/LessonCard/LessonCard';

export default function Lessons() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const authKey = useSelector(state => state.auth.keys)
    
    const fetchLessons = async (key=authKey) => {
        try {
            const response = await api({
                method: 'get',
                url: '/list',
            })
            setData(response.data.filter((el) => {
                return el.type === 'lesson'
            }))
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchLessons()
    },[])

    return(
        <div className="lessons-main">
            <div className="lessons-main__list">
                {
                    data.map((el, key) => <LessonCard key={key} {...el}/>)
                }
            </div>
        </div>
    );
}
