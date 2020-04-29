import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useHistory, useParams } from 'react-router-dom';
import api from 'services/api';

import './styles.scss';

import AutorCard from '../../cards/AutorCard/AutorCard';

export default function SingleLesson() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(false);

    const params = useParams();
    const history = useHistory();

    const fetchProject = async () => {
        try {
            const response = await api({
                method: 'get',
                url: `/get_project/${params.lesson_hash}`
            })
            setData(response.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchProject()
    },[])

    return(
        <>
            <div className="single-lesson">
                <div className="single-lesson__content">
                    <div className="single-lesson__content--header">
                        {
                            !loading &&
                        <h1 className="lesson-title">{data.name.toLowerCase()}</h1>
                        }
                    </div>
                    <div className="single-lesson__content--video">
                        {
                            loading ?
                                <div className="lds-dual-ring"></div>
                                :
                                data.video ?
                                    <ReactPlayer width='100%' url={data.video}/>
                                    :
                                <div className="video-fallback">
                                    <h1>Projeto não possui video</h1>
                                </div>
                        }
                    </div>
                    <div className="single-lesson__content--desc">
                        <p className="lesson-text">{data.description}</p>
                    </div>
                    <div className="single-lesson__content--pic">
                        <div className="pic-container">
                            {
                                loading ?
                                    <div className="lds-dual-ring"></div>
                                    :
                                    data.pictures.file1 &&
                                    <>
                                        <a className="pic-container__overlay" 
                                            href={data.pictures.file1} target="_blank">
                                            <i className="material-icons">get_app</i>
                                        </a>
                                        <img 
                                            className="pic-container__img" 
                                            src={data.pictures.file1} alt="foto" />
                                    </>
                            }
                        </div>
                        <div className="pic-container">
                            {
                                loading ?
                                    <div className="lds-dual-ring"></div>
                                    :
                                    data.pictures.file2 &&
                                    <>
                                        <a className="pic-container__overlay" 
                                            href={data.pictures.file2} target="_blank">
                                            <i className="material-icons">get_app</i>
                                        </a>
                                        <img className="pic-container__img" 
                                            src={data.pictures.file2} alt="foto" />
                                    </>
                            }
                        </div>
                        <div className="pic-container">
                            {
                                loading ?
                                    <div className="lds-dual-ring"></div>
                                    :
                                    data.pictures.file3 &&
                                    <>
                                        <a className="pic-container__overlay" 
                                            href={data.pictures.file3} target="_blank">
                                            <i className="material-icons">get_app</i>
                                        </a>
                                        <img className="pic-container__img" 
                                            src={data.pictures.file3} alt="foto" />
                                    </>
                            }
                        </div>
                    </div>
                    <div className="single-lesson__content--footer">
                        <button onClick={() => history.goBack()} 
                            className="app-btn">Voltar</button>
                            {
                                loading ?
                                    <div className="lds-dual-ring"></div>
                                    :
                                    <div className="footer-autor">
                                        <div className="clip-container">
                                            <AutorCard id={data.project_id} />
                                        </div>
                                        <img className="autor-img" src={data.autor_pic} />
                                        <p className="autor-name">{data.autor}</p>
                                    </div>
                            }
                    </div>
                </div>
            </div>
        </>
    );
}
