import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from 'store/ducks/shop';

import './styles.scss';

export default function ArrangementDialog({handler}) {
    const [liked, setLikes] = useState(false);

    const status = {
        true: 'favorite',
        false: 'favorite_border'
    };
    const isLiked = status[liked]

    const cart = useSelector(state => state.shop.cart)

    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch(addCart({
            'id' : 1,
            'name': 'nome_do_arranjo',
            'imagem': 'urldaimg',
        }))
    }
    
    useEffect(() => {
        document.getElementsByTagName('body')[0].style.overflowY="hidden"

        return () => {
            document.getElementsByTagName('body')[0].style.overflowY="auto"
        }       
    }, [])

    return(
        <div className="arr-dialog">
            <button onClick={handler} className="arr-dialog--close"><i className="material-icons">clear</i></button>
            <div className="arr-dialog__content">
                    <div className="arr-dialog__content__info--header portrait">
                        <h2 className="arr-title">Nome do arranjo</h2>
                        <button onClick={addToCart} 
                        className="dialog-btn">Solicitar</button>
                    </div>
                <img src=
                "https://ikebana-app-content.s3-sa-east-1.amazonaws.com/Ikebana_-_Yoshiko_Nakamura_01B.jpg" alt="Planta" />
                <button className="like-btn"
                    onClick={() => setLikes(true)}>
                    <i className="material-icons">{isLiked}</i>
                        1337
                </button>
                <div className="arr-dialog__content__info">
                    <div className="arr-dialog__content__info--header landscape">
                        <h2 className="arr-title">Nome do arranjo</h2>
                        <button onClick={addToCart} className="dialog-btn">Solicitar</button>
                    </div>
                    <div className="arr-dialog__content__info--desc">
                        <p className="arr-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras libero ipsum, rhoncus sed arcu eget, elementum ultricies ipsum. Ut euismod mi justo. Vestibulum tempus mi dictum odio venenatis molestie. Sed at lacinia augue. Nulla in malesuada mauris, quis ultricies ipsum. Aenean eu enim ullamcorper, tempor ligula ut, tempor odio. In dictum orci ex.</p>
                    </div>
                    <div className="arr-dialog__content__info--footer">
                        <img className="autor-picture" 
                        src={"https://ikebana-app-users.s3-sa-east-1."+
                        "amazonaws.com/perfil.png"} alt="Autor" />
                        <p className="autor-name">fabricio.dematte</p>
                        <button className="dialog-btn blinker">Aulas</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
