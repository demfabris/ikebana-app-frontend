import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCart } from 'store/ducks/shop';
import Slider from 'react-slick';
import api from 'services/api';

import Dialog from '../../Dialog';
import Modal from '../../../aux/Modal';
import ErrorDialog from '../../../aux/ErrorDialog/ErrorDialog';

import './styles.scss';

export default function ArrangementDialog({ handler, el, likeHandler, likeCount }) {
    const authKey = useSelector(state => state.auth.keys)
    const [loading, setLoading] = useState(true);
    const [userID, setUserID] = useState(false);
    const [liked, setLiked] = useState(false);
    const [ordered, setOrdered] = useState(false);
    const [owner, setOwner] = useState(false);
    const [error, setError] = useState(false);
    const [likeInactive, setLikeInactive] = useState(false);
    const history = useHistory();


    //carousel custom settings
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={"custom-arrow dialog-next"}
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
                className={"custom-arrow dialog-prev"}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            >
                <i className="material-icons">arrow_back_ios</i>
            </div>
        );
    }
    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    //end carousel settings

    //dispatching to cart
    const cart = useSelector(state => state.shop.cart)
    const dispatch = useDispatch();
    const addToCart = () => {
        if (owner) {
            setError('Você não pode solicitar o arranjo a sí mesmo(a)')   
        } else {
            dispatch(addCart({
                'project_id': el.project_id,
                'name': el.name,
                'picture': el.pictures.file1,
            }))
            setOrdered(true)
        }
    }


    //fetching user_id to check like status
    const fetchUsername = async (key=authKey) => {
        try {
            const username = await api({
                method: 'get',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
            })
            console.log(el)
            setUserID(username.data.id)
            el.autor === username.data.email ? setOwner(true) : console.log('')
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    //commiting like to db
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
        cart.map((obj) => (
            Object.values(obj).includes(el.project_id)) && setOrdered('Adicionado')
        )
        authKey.length === 0 && setLikeInactive(true)
    },[])


    return(
        <>
        <Dialog handler={handler}>
            <div className="arrangement-landscape">
                <div className="arrangement-landscape__picture">
                    <Slider {...settings}>
                        {
                            el.pictures.file1 && 
                                <div className="arrangement-landscape__picture--slide">
                                    <img className="slide-img" src={el.pictures.file1} />
                                </div>
                        }
                        {
                            el.pictures.file2 && 
                                <div className="arrangement-landscape__picture--slide">
                                    <img className="slide-img" src={el.pictures.file2} />
                                </div>
                        }
                        {
                            el.pictures.file3 && 
                                <div className="arrangement-landscape__picture--slide">
                                    <img className="slide-img" src={el.pictures.file3} />
                                </div>
                        }
                    </Slider>
                </div>
                <div className="arrangement-landscape__about">
                    <div className="arrangement-landscape__about--header">
                        <h1 className="arrangement-title">{el.name}</h1>
                        {
                            authKey.length !== 0 &&
                        <button onClick={(el.allow && !ordered) ? addToCart : undefined} 
                            title={el.allow ? 'Fazer uma solicitação deste arranjo' 
                            : 'O autor não permite solicitações deste arranjo'}
                            className={el.allow && !ordered ? 'app-btn' : 'btn-inactive'}>
                        {!ordered ? 'Solicitar' : 'Adicionado'}</button>
                        }
                    </div>
                    <div className="arrangement-landscape__about--desc">
                        <div className="arrangement-autor">
                            <img className="arrangement-autor__img" src={el.autor_pic} />
                            <p className="arrangement-autor__name">{el.autor_fullname.toLowerCase()} <b>-</b></p>
                        </div>
                        <p className="arrangement-landscape__about--desc--text">
                            {el.description}
                        </p>
                    </div>
                    <div className="arrangement-landscape__about--footer">
                        <div className="arrangement-likes">
                            <p className="arrangement-likes__num">{likeCount}</p>
                            <button onClick={() => {
                                if (!Object.keys(el.liked_by).includes(userID.toString())) {
                                    setLiked(true)
                                    commitLike()
                                    likeHandler()
                                    setLikeInactive(true)
                                }}} 
                                className={`arrangement-likes__like ${likeInactive && 'blurred'}`}>
                                {
                                    Object.keys(el.liked_by).includes(userID.toString()) ?
                                        <i title="Curtido" 
                                    className="material-icons">favorite</i>
                                            :
                                        <i className="material-icons">{liked ? 'favorite' 
                                        : 'favorite_border'}</i>
                                }
                            </button>
                        </div>
                        {
                            el.video === '' ? 
                            <button title="Este projeto não possui video" 
                            className="btn-inactive arr-btn">Video</button>
                                :
                                <button onClick={() => 
                                        history.push(`/lesson/${el.project_id.toString()}`)} 
                            className="app-btn arr-btn">Video</button>
                        }
                    </div>
                </div>
            </div>
            <div className="arrangement-portrait">
                <div className="arrangement-portrait__header">
                    <h1 className="arrangement-title">{el.name}</h1>
                    {
                        authKey.length !== 0 &&
                        <button onClick={(el.allow && !ordered) ? addToCart : undefined} 
                            title={el.allow ? 'Fazer uma solicitação deste arranjo' 
                            : 'O autor não permite solicitações deste arranjo'}
                            className={el.allow && !ordered ? 'app-btn dialog-btn' : 'btn-inactive'}>
                        {!ordered ? 'Solicitar' : 'Adicionado'}</button>
                    }
                </div>
                <div className="arrangement-portrait__picture">
                    <Slider {...settings}>
                        {
                            el.pictures.file1 && 
                                <div className="arrangement-portrait__picture--slide">
                                    <img className="slide-img" src={el.pictures.file1} />
                                </div>
                        }
                        {
                            el.pictures.file2 && 
                                <div className="arrangement-portrait__picture--slide">
                                    <img className="slide-img" src={el.pictures.file2} />
                                </div>
                        }
                        {
                            el.pictures.file3 && 
                                <div className="arrangement-portrait__picture--slide">
                                    <img className="slide-img" src={el.pictures.file3} />
                                </div>
                        }
                    </Slider>
                </div>
                <div className="arrangement-portrait__desc">
                    <div className="arrangement-autor">
                        <img className="arrangement-autor__img" 
                            src={el.autor_pic} alt="Autor img" />
                        <p className="arrangement-autor__name">{el.autor_fullname.toLowerCase()} <b>-</b></p>
                    </div>
                    <p className="arrangement-portrait__desc--text">{el.description}</p>
                </div>
                <div className="arrangement-portrait__footer">
                    <div className="arrangement-portrait__footer--likes">
                            <p className="arrangement-likes__num">{likeCount}</p>
                            <button onClick={() => {
                                if (!Object.keys(el.liked_by).includes(userID.toString())) {
                                    setLiked(true)
                                    commitLike()
                                    likeHandler()
                                    setLikeInactive(true)
                                }}} 
                                className={`arrangement-likes__like ${likeInactive && 'blurred'}`}>
                                {
                                    Object.keys(el.liked_by).includes(userID.toString()) ?
                                        <i title="Curtido" 
                                    className="material-icons">favorite</i>
                                            :
                                        <i className="material-icons">{liked ? 'favorite' 
                                        : 'favorite_border'}</i>
                                }
                            </button>
                    </div>
                        {
                            el.video === '' ? 
                            <button title="Este projeto não possui video" 
                            className="btn-inactive arr-btn lesson-btn">Video</button>
                                :
                                <button onClick={() => 
                                        history.push(`/lesson/${el.project_id.toString()}`)} 
                            className="app-btn arr-btn lesson-btn">Video</button>
                        }
                </div>
            </div>
        </Dialog>
        {
            error &&
                <Modal>
                    <ErrorDialog handler={() => setError(false)} value={error}/>
                </Modal>
        }
        </>
    );
}
