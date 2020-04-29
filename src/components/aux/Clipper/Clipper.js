import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from 'store/ducks/shop';

import CartElement from '../../list_elements/CartElement/CartElement';
import CheckoutDialog from '../../Dialog/components/CheckoutDialog/CheckoutDialog';

import Modal from '../../aux/Modal';

import './styles.scss';

export default function Clipper({handler}) {
    const [dialog, setDialog] = useState(false);
    const cart = useSelector(state => state.shop.cart);

    const proceedCheckout = () => {
        cart.length !== 0 ? setDialog(true) : console.log();
    }

    useEffect(() => {
     dialog === true ? 
            document.getElementById("clipper").style.display="none" 
                    :
            document.getElementById("clipper").style.display="block"
    })


    const dispatch = useDispatch();
    const clearAll = () => {
        dispatch(clearCart())
    }

    return(
        <>
            <div className="holder" id="clipper">
                <div onClick={handler} className="clipper"></div>
                <div className="clipper-arrow"></div>
                <div className="clipper-main">
                    {
                        cart.length === 0 ?
                            <p className="clipper-main__info">Nenhum arranjo selecionado...</p>
                            :
                        cart.map((el, key) => (
                            <CartElement key={key} {...el} />
                        ))
                    }
                </div>
                <div className="clipper-footer">
                    <button onClick={proceedCheckout} 
                        className="clipper--checkout-btn">
                        Finalizar</button>
                    <button onClick={clearAll} 
                        className="clipper--clear-btn">Limpar</button>
                </div>
            </div>
            {
                dialog &&
                    <Modal>
                        <CheckoutDialog handler={() => setDialog(false)}/>
                    </Modal>
            }
        </>
    );
}
