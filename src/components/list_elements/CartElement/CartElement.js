import React from 'react';
import { useDispatch } from 'react-redux';
import { delCart } from 'store/ducks/shop';

import './styles.scss';

export default function CartElement(el){
    const dispatch = useDispatch();

    const delCartItem = () => {
        dispatch(delCart(el.project_id))
    }

    return(
        <>
            <div className="cart-el">
                <img className="cart-el--img"
                    src={el.picture} />
                <p className="cart-el--name">{el.name}</p>
                <button onClick={delCartItem} 
                    className="cart-el--delete">
                    <i style={{color: "red"}} 
                    className="material-icons">delete</i>
                </button>
            </div>
        </>
    );
}
