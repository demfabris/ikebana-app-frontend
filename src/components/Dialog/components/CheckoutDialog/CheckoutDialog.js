import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from 'services/api';
import { useForm } from 'react-hook-form';
import { clearCart } from 'store/ducks/shop';

import Modal from '../../../aux/Modal';
import WarningDialog from '../../../aux/WarningDialog/WarningDialog';
import Dialog from '../../Dialog';
import CheckoutCartElement from '../../../list_elements/CartElement/CheckoutCartElement';

import './styles.scss';

export default function CheckoutDialog({handler}) {
    const { register, errors, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState(false);
    const [message, setMessage] = useState(false);
    const dispatch = useDispatch();
    const authKey = useSelector(state => state.auth.keys);
    const cart = useSelector(state => state.shop.cart);

    const sendSolicitation = async () => {
        setLoading(true)
        try {
            const response = await api({
                method: 'post',
                url: '/solicitation',
                headers: {
                    'Authorization': `Bearer ${authKey[0].key}`,
                },
                data: [
                    {...cart}, 
                    {autor_msg: message}
                ]
            })
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
            dispatch(clearCart())
            handler()
        }
    }

    console.log(message)
    return (
        <>
        <Dialog handler={handler}>
            <div className="checkout-dialog-landscape">
                <div className="checkout-dialog-landscape__header">
                    <h1 className="checkout-dialog-landscape__header--text">Solicitações</h1>
                </div>
                <div className="checkout-dialog-landscape__content">
                    <div className="checkout-dialog-landscape__content--info">
                        <div className="info-container">
                            <h2 className="info-container__title">Sobre</h2>
                            <p className="info-container__text">Você está realizando uma solicitação a um membro da plataforma. Esta solicitação tem caráter solidário e não visa lucros. O solicitado poderá <b>recusar</b> o pedido caso não possa atendê-lo.</p>
                        </div>
                        <div className="info-container">
                            <h2 className="info-container__title">Doações</h2>
                            <p className="info-container__text">Caso o pedido seja aprovado considere fazer um donativo para cobrir custos materiais do arranjo. Poderá ser entregue no local de retirada.</p>
                        </div>
                        <div className="info-container">
                            <h2 className="info-container__title">Mensagem</h2>
                            <textarea className="info-container__msg" 
                                id="autor_msg" name="autor_msg" 
                                ref={register({required: true, minLength: 5})}
                                onChange={el => setMessage(el.target.value)}
                                placeholder="Escreva uma breve saudação explicando a finalidade e a motivo da solicitação.">
                            </textarea>
                        </div>
                    </div>
                    <div className="checkout-dialog-landscape__content--prod">
                        <div className="order-container">
                            <div className="order-overlay"></div>
                            {
                                cart.map((el, key) => (
                                    <CheckoutCartElement key={key} {...el}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="checkout-dialog-landscape__content--footer">
                    <button onClick={() => setWarning('Você está prestes a notificar o autor sobre uma solicitação... Confirmar?')} type="button"
                        className="app-btn filled-btn done-btn">
                        {
                            loading === true ? <div className="sizer">
                                <div class="lds-ellipsis"><div></div>
                                    <div></div><div></div><div></div></div>
                            </div>
                            :
                            <p>Concluir</p>
                        }
                    </button>
                </div>
            </div>
            {/* 
                PORTRAIT
                */}
            <div className="checkout-dialog-portrait">
                <div className="checkout-dialog-portrait__header">
                    <h1 className="checkout-dialog-portrait__header--text">
                        Solicitações</h1>
                </div>
                <div className="checkout-dialog-portrait__content">
                    <div className="checkout-dialog-portrait__content--info">
                        <div className="info-container">
                            <h2 className="info-container__title">Sobre</h2>
                            <p className="info-container__text">Você está realizando uma solicitação a um membro da plataforma. Esta solicitação tem caráter caritativo e não visa lucros. O solicitado poderá <b>recusar</b> o pedido caso não possa atendê-lo.</p>
                        </div>
                        <div className="info-container">
                            <h2 className="info-container__title">Doações</h2>
                            <p className="info-container__text">Caso o pedido seja aprovado considere fazer um donativo para cobrir custos materiais do arranjo. Poderá ser entregue no local de retirada.</p>
                        </div>
                        <div className="info-container">
                            <h2 className="info-container__title">Mensagem</h2>
                            <textarea className="info-container__msg" 
                                id="portrait_msg" name="autor_msg" 
                                ref={register({required: true, minLength: 5})}
                                onChange={el => setMessage(el.target.value)}
                                placeholder="Escreva uma breve saudação explicando a finalidade e a motivo da solicitação.">
                            </textarea>
                        </div>
                    </div>
                    <h2 className="orders-title">Arranjos Escolhidos</h2>
                    <div className="checkout-dialog-portrait__content--orders">
                        {
                            cart.map((el, key) => (
                                <CheckoutCartElement {...el} key={key}/>
                            ))
                        }
                    </div>
                    <div className="checkout-dialog-portrait__content--footer">
                        <button onClick={() => setWarning('Você está prestes a notificar o autor sobre uma solicitação... Confirmar?')} 
                            type="button" className="app-btn filled-btn done-btn">
                            {
                                loading === true ? <div className="sizer">
                                    <div class="lds-ellipsis"><div></div>
                                        <div></div><div></div><div></div></div>
                                </div>
                                :
                                <p>Concluir</p>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
            {
                warning &&
                    <Modal>
                        <WarningDialog handler={() => setWarning(false)} value={warning} accept={sendSolicitation}/>
                    </Modal>
            }
        </>
    );
}
