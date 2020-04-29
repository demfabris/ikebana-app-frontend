import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { motivation } from 'static/textcontent';
import './styles.scss';

import Footer from '../../Footer/Footer';

export default function Motivation() {
    const history = useHistory();
    let delta = 0
    let op_delta = 0

    useEffect(() => {
        const hero = document.getElementById("parallax_hero");
        const view = document.documentElement;

        window.onscroll = function() {parallax()};

        const parallax = () => {
            delta =+ view.scrollTop/3
            op_delta =+ view.scrollTop/431
            hero.style.backgroundPosition=`50% ${-delta}px`
            hero.style.opacity=`${1-op_delta}`
        }
    }, [])

    useEffect(() => {
        document.body.style.background = "#2c2c2c";
        return () => {
            document.body.style.background = "#f8f9fc";
        }
    }, [])

    return(
        <div className="motivation">
            <div id="parallax_hero" className="motivation__hero">
            </div>
            <div className="motivation__header">
                <h1 className="motivation__header--text">
                    Motivação na Ikebana Sanguetsu
                </h1>
            </div>
            <div className="motivation__content">
                <p className="motivation__content--text">{motivation.text1}</p>
                <img className="motivation__content--img" src="https://www.fmo.org.br/sanguetsu/wp-content/uploads/sites/9/2017/03/Tony-Tajima-web.jpg" alt="Expo" />
                <p className="motivation__content--text">{motivation.text2}</p>
                <span className="motivation__content--footer">Texto e imagem retirado do website: fmo.org.br/sanguetsu</span>
                <img className="underlay" src="https://ikebana-app-content.s3-sa-east-1.amazonaws.com/static/mainlogo_transparent_notext.png" alt="Logo" />
                <button className="motivation__content--btn" onClick={() => {
                    history.goBack()
                }}>Retornar</button>
            </div>
            <Footer />
        </div>
    );
}
