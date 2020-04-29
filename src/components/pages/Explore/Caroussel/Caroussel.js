import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

import './styles.scss';

export default function Caroussel() {

    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={"custom-arrow next"}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            >
                <i className="material-icons">arrow_forward_ios</i>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={"custom-arrow prev"}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            >
                <i className="material-icons">arrow_back_ios</i>
            </div>
        );
    }

    return(
        <div className="caroussel" id="carousel">
            <Slider {...settings}>
                <div className="slide-content slide-3">
                    <div className="slide-content__overlay color-change-2x">
                        <h1 className="slide-content__overlay--text vibrate-3">Assista videoaulas sobre arranjos e técnicas da Ikebana Sanguetsu.</h1>
                    </div>
                    <img className="carousel-img" src=
                        "https://ikebana-app-content.s3-sa-east-1.amazonaws.com/static/caroussel/ikebana-class3.jpg" alt="hero"/>
                </div>
                <div className="slide-content">
                    <div className="slide-content__overlay color-change-2x">
                        <h1 className="slide-content__overlay--text vibrate-3">Explore arranjos feitos por membros do aplicativo e solicite um arranjo da sua região.</h1>
                    </div>
                    <img className="carousel-img slide-1" src=
                        "https://ikebana-app-content.s3-sa-east-1.amazonaws.com/carousel/sliderxxxxx.jpg" alt="hero"/>
                </div>
                <div className="slide-content">
                    <div className="slide-content__overlay color-change-2x">
                        <h1 className="slide-content__overlay--text vibrate-3">Torne-se membro para criar arranjos e aulas sobre o método Sanguetsu</h1>
                    </div>
                    <img className="carousel-img slide-2" src="https://ikebana-app-content.s3-sa-east-1.amazonaws.com/carousel/sliderxxxx.jpg" alt="hero"/>
                </div>
            </Slider>
        </div>
    );
}
