import React, { useEffect, useState } from 'react';
import api from 'services/api';

import './styles.scss';

import ArrangementBig from '../../cards/Arrangement_big/ArrangementBig';
import Caroussel from './Caroussel/Caroussel';

export default function Explore() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(false);

    //top bar blur
    useEffect(() => {
        if (window.innerWidth < 850) {
            document.getElementsByClassName("prev")[0].style.transform="translateX(0)"
        }
        // document.getElementById("header_main").style.background="rgba(255,255,255,0.3)"
        // document.getElementById("header_main").style.backdropFilter="blur(15px)"
        // return () => {
        //     if (window.location.pathname !== '/motivation' &&
        //         window.location.pathname !== '/register' &&
        //         window.location.pathname !== '/login' &&
        //         window.location.pathname !== '/forgot_pass' &&
        //         window.location.pathname !== '/logout') {
        //         document.getElementById("header_main").style.background="#fff"
        //         document.getElementById("header_main").style.backdropFilter="none"
        //     }
        // }
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await api({
                method: 'get',
                url: '/list',
            })
            response.data && setData(response.data.filter((el) => {
                return el.type === 'arrangement'}))
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    },[])


    return (
        <div className="explore">
            <Caroussel />
            <div className="explore-main" id="explore_main">
                <div className="explore-all">
                    <div className="explore-all__header">
                        <h2>Todos os arranjos</h2>
                    </div>
                    <div className="explore-all__container">
                        <div className="explore-all__container--main" 
                            id="explore_all">
                            {
                                loading ?
                                    <div className="lds-dual-ring"></div>
                                    :
                                    data.map((el, key) => <ArrangementBig key={key} {...el}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
