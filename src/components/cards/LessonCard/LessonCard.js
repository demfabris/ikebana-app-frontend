import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from 'services/api';
import { useSelector } from 'react-redux';

import './styles.scss';


export default function LessonCard(el) {
    const authKey = useSelector(state => state.auth.keys);
    const [loading, setLoading] = useState(true);
    const [userID, setUserID] = useState(false);
    const [liked, setLiked] = useState(false);


    const fetchUsername = async (key=authKey) => {
        try {
            const username = await api({
                method: 'get',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
            })
            setUserID(username.data.id)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const commitLike = async (key=authKey) => {
        try {
            const response = await api({
                method: 'post',
                url: '/like_project',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
                data: {
                    project_id: el.project_id
                }
            })
            console.log(response.data)
        } catch(e) {
            console.log(e)
        } 
    }

    useEffect(() => {
        authKey.length !== 0 && fetchUsername()
    },[])

    return(
        <div className="lesson">
            <div className="lesson-main">
                <div className="lesson-main__picture">
                    <img className="lesson-pic" src={el.pictures.file1} />
                </div>
                <div className="lesson-main__title">
                    <h2 className="lesson-title">{el.name}</h2>
                    <p className="lesson-desc">{el.description}</p>
                    <a className="lesson-autor">{el.autor_fullname}</a>
                </div>
                <div className="lesson-main__buttons">
                    <button title="Em breve" className="lesson-main__buttons--hidden share-btn">
                        <i className="material-icons">share</i>
                    </button>
                    <button onClick={() => {
                        setLiked(true)
                        commitLike()
                    }} 
                        className={`lesson-main__buttons--hidden like-btn 
                            ${authKey.length === 0 ? 'like-disabled' : ''}`}>
                        {
                            Object.keys(el.liked_by).includes(userID.toString()) ?
                                <i title="Curtido" className="material-icons">favorite</i>
                                :
                                <i className="material-icons">{liked ? 'favorite' : 'favorite_border'}</i>
                        }
                    </button>
                    <div className="lesson-main__buttons--wrapper">
                        <Link className="btn-link" to={{
                            pathname: `/lesson/${el.project_id}`
                        }}>
                            <button className="app-btn">
                                Acessar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
